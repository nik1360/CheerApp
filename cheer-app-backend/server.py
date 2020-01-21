from flask import Flask, jsonify, request, json, redirect
import datetime

from database.db_manager import DatabaseManager, logout
from database.db_insert_handler import DatabaseInsertHandler
from database.db_event_handler import DatabaseEventHandler
from database.db_checker import DatabaseChecker
from database.db_delete_handler import DatabaseDeleteHandler
from database.db_users_handler import DatabaseUsersHandler

from registered_user import RegisteredUser
from venue import Venue
from event import Event
from organizer import Organizer

import stripe
import os


app = Flask(__name__)
db = DatabaseManager()
db_insert = DatabaseInsertHandler()
db_delete = DatabaseDeleteHandler()

logged_user = None
login_status = False

amount = 0
name = 0


@app.route('/login/<type_of_user>', methods=['POST'])
def login(type_of_user):
    username = request.get_json()['username']
    password = request.get_json()['password']
    if type_of_user == 'organizer':
        organizer_will_login = True
    else:
        organizer_will_login = False

    global login_status
    global logged_user
    login_status, logged_user, msg = db.login(username, password, organizer_will_login)

    if login_status:
        result = jsonify({'username': logged_user.username, 'error': False})
    else:
        result = jsonify({"error": msg})

    return result


@app.route('/logout', methods=['POST'])
def logout_user_organizer():
    global login_status
    global logged_user
    login_status, logged_user, msg = logout()

    if not login_status:
        result = jsonify({'message': msg, 'error': False})
    else:
        result = jsonify({"error": msg})
    return result


@app.route('/register/<type_of_user>', methods=['POST'])
def register(type_of_user):
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = request.get_json()['password']
    first_name = request.get_json()['firstname']
    last_name = request.get_json()['lastname']
    date_of_birth = request.get_json()['dateofbirth']

    if type_of_user == 'organizer': # register an organizer
        phone_number = request.get_json()['phonenumber']
        status, msg = db_insert.insert_organizer(Organizer(username, password, email, phone_number, first_name, last_name,
                                                           date_of_birth))
    else:
        city = request.get_json()['city']
        nationality = request.get_json()['nationality']
        flag_rock = request.get_json()['flagrock']
        flag_hiphop = request.get_json()['flaghiphop']
        flag_reggae = request.get_json()['flagreggae']
        flag_reggaeton = request.get_json()['flagreggaeton']
        flag_techno = request.get_json()['flagtechno']
        flag_electronic = request.get_json()['flagelectronic']
        status, msg = db_insert.insert_user(RegisteredUser(username, password, email, first_name, last_name,
                                                           date_of_birth, city, nationality, flag_rock, flag_hiphop,
                                                           flag_reggae, flag_reggaeton, flag_techno, flag_electronic))
    if status:
        result = jsonify({'error': False, 'message':msg})
    else:
        result = jsonify({"error": msg})
    return result


@app.route('/events/search', methods=['POST'])
def search_events():
    # retrieve information from the client
    date = request.get_json()['date']
    city = request.get_json()['city']
    flag_rock = request.get_json()['flagrock']
    flag_hiphop = request.get_json()['flaghiphop']
    flag_reggae = request.get_json()['flagreggae']
    flag_reggaeton = request.get_json()['flagreggaeton']
    flag_techno = request.get_json()['flagtechno']
    flag_electronic = request.get_json()['flagelectronic']
    criteria_city = request.get_json()['criteriacity']
    criteria_date = request.get_json()['criteriadate']
    criteria_genres = request.get_json()['criteriagenres']

    # search the events basing on the selected criteria
    db_event = DatabaseEventHandler(city, date, flag_rock, flag_hiphop, flag_reggaeton,
                                    flag_reggae, flag_techno, flag_electronic)
    event_list = db_event.search(criteria_city, criteria_date, criteria_genres)
    # check if some event was found
    if not event_list:
        result = jsonify({'error': True, 'message': 'No event respects the selected criteria'})
    else:
        json_data = json.dumps(event_list, default=lambda o: o.__dict__, indent=4)
        result = jsonify({'events': json_data, 'error': False, 'message': 'Events are present'})
    return result

@app.route('/events/<event_code>/ask', methods=['POST'])
def ask(event_code):
    org_username = request.get_json()['username']
    status, org, msg = DatabaseEventHandler().retrieve_organizer_details(org_username)

    if status:
        result = jsonify({'email':org.email,'error': False, 'message':msg})
    else:
        result = jsonify({'error': True,'message':msg})
    return result

@app.route('/register/event', methods=['POST'])
def register_event():


    name = request.get_json()['name']
    description = request.get_json()['description']
    date = request.get_json()['date']
    start_time = request.get_json()['start_time']
    end_time = request.get_json()['end_time']
    city = request.get_json()['city']
    address = request.get_json()['address']
    venue_name = request.get_json()['venue']
    price = request.get_json()['price']
    flag_rock = request.get_json()['flagrock']
    flag_hiphop = request.get_json()['flaghiphop']
    flag_reggae = request.get_json()['flagreggae']
    flag_reggaeton = request.get_json()['flagreggaeton']
    flag_techno = request.get_json()['flagtechno']
    flag_electronic = request.get_json()['flagelectronic']
    organizer = request.get_json()['organizer']

    venue = DatabaseChecker().retrieve_venue(venue_name, city, address)
    if venue is None:
        venue=Venue(venue_name,city,address)
        db_insert.insert_venue(venue)

    ev=Event(name=name,description=description,price=price,venue=venue,
                                              organizer=organizer,date=date,start_time=start_time, end_time=end_time,
                                              flag_rock=flag_rock, flag_hiphop=flag_hiphop, flag_reggae=flag_reggae,
                                               flag_reggaeton=flag_reggaeton,flag_techno=flag_techno,
                                               flag_electronic=flag_electronic)
    status, msg = db_insert.insert_event(ev)

    if status:
        result = jsonify({'event_code': ev.code ,'error': False, 'message':msg})
    else:
        result = jsonify({'error': True,'message':msg})
    return result

@app.route('/events/<event_code>/rate', methods=['POST'])
def rate(event_code):
    user_username = request.get_json()['user_username']
    organizer_username = request.get_json()['organizer_username']
    #event_code = request.get_json()['event_code']
    rating = request.get_json()['rating_value']
    try:
        status, msg = db_insert.insert_rating(user=user_username, organizer=organizer_username,
                                              event_code=event_code, rating=rating)
    except Exception:
        status=False
        msg= user_username + ' already rated event ' + event_code
    finally:
        result = jsonify({'error': not status, 'message':msg})
        return result

@app.route('/events/<event_code>/deleteRating', methods=['POST'])
def delete_rate(event_code):
    user_username = request.get_json()['user_username']
    try:
        status,msg = db_delete.delete_rating(username=user_username, event_code=event_code)
    except Exception as e:
        status=False
        msg= 'Impossible to delete the review'
        print(str(e))
    finally:
        result = jsonify({'error': not status, 'message':msg})
        return result

@app.route('/events/<event_code>/attend', methods=['POST'])
def attend(event_code):
    user_username = request.get_json()['user_username']
    try:
        status,msg = db_insert.insert_users_events(user_username=user_username, event_code=event_code)
    except Exception as e:
        status=False
        msg= user_username + ' already attend event ' + event_code
        print(str(e))
    finally:
        result = jsonify({'error': not status, 'message':msg})
        return result

@app.route('/events/<event_code>/notAttend', methods=['POST'])
def not_attend(event_code):
    user_username = request.get_json()['user_username']
    try:
        status,msg = db_delete.delete_attendance(username=user_username, event_code=event_code)
    except Exception as e:
        status=False
        msg= 'Impossible to remove attendance'
        print(str(e))
    finally:
        result = jsonify({'error': not status, 'message':msg})
        return result

@app.route('/events/<event_code>/userstatus', methods=['POST'])
def check_user_event_status(event_code):
    user_username = request.get_json()['user_username']

    rating_status, rating=DatabaseChecker().check_rating_existence(user=user_username,event_code=event_code)
    attend_status = DatabaseChecker().check_event_attendance(user_username=user_username, event_code=event_code)

    f2 = []
    if user_username != '': # a user is logged in
        _ , friends, msg = DatabaseUsersHandler().get_friends_list(user_username)
        if friends is not None:
            for f in friends: # the friend f attend the event
                if not DatabaseChecker().check_event_attendance(user_username=f, event_code=event_code):
                    f2.append(f)

    result = jsonify({'show_rating': rating_status, 'show_attend': attend_status, 'rating':rating,
                      'friends_attend_event': f2})
    return result

@app.route('/users/<username>/getDetails', methods=['POST'])
def retrieve_user_info(username):
    status, user, msg = DatabaseUsersHandler().find_user_username(username=username)
    if status:
        DatabaseEventHandler().retrieve_joined_events(user=user)
        _, f_list, _ = DatabaseUsersHandler().get_friends_list(username)
        user.friends_list.append(f_list)
        json_user = json.dumps(user, default=lambda o: o.__dict__, indent=4)
        json_friends = json.dumps(user.friends_list, default=lambda o: o.__dict__, indent=4)
        json_events = json.dumps(user.joined_events, default=lambda o: o.__dict__, indent=4)

        result = jsonify({'user': json_user, 'joined_events': json_events,'friends':json_friends,'error':False, 'message': msg })
    else:
        result = jsonify({'user': None, 'error': True, 'message': msg})
    return result

@app.route('/events/<event_code>/getDetails', methods=['POST'])
def retrieve_event_info(event_code):
    global amount  # used by charge function
    global name

    status, event, msg = DatabaseEventHandler().retrieve_event_by_code(event_code=event_code)
    if status:
        event=event[0]
        amount = event.price * 100
        name = event.name

        json_event = json.dumps(event, default=lambda o: o.__dict__, indent=4)
        result = jsonify({'event': json_event, 'stripe_pub_key':os.getenv('STRIPE_PUBLISHABLE_KEY'),'error':False, 'message': msg })
    else:
        result = jsonify({'event': None, 'error': True, 'message': msg})
    return result

@app.route('/users/search', methods=['POST'])
def search_users():
    # retrieve information from the client
    username = request.get_json()['username']
    city = request.get_json()['city']
    flag_rock = request.get_json()['flagrock']
    flag_hiphop = request.get_json()['flaghiphop']
    flag_reggae = request.get_json()['flagreggae']
    flag_reggaeton = request.get_json()['flagreggaeton']
    flag_techno = request.get_json()['flagtechno']
    flag_electronic = request.get_json()['flagelectronic']
    criteria_username = request.get_json()['criteriausername']
    criteria_city = request.get_json()['criteriacity']
    criteria_genres = request.get_json()['criteriagenres']

    music_tastes = {
        "rock": flag_rock,
        "hiphop": flag_hiphop,
        "reggaeton": flag_reggaeton,
        "reggae": flag_reggae,
        "techno": flag_techno,
        "electronic": flag_electronic
    }

    users_list = DatabaseUsersHandler().search(username=username, city=city, music_tastes=music_tastes,
                                  criteria_city=criteria_city, criteria_username=criteria_username,
                                  criteria_genres=criteria_genres)
    # check if some event was found
    if not users_list:
        result = jsonify({'error': True, 'message': 'No users'})
    else:
        json_data = json.dumps(users_list, default=lambda o: o.__dict__, indent=4)
        result = jsonify({'users': json_data, 'error': False, 'message': 'Users found'})
    return result

@app.route('/users/<username>/addFriend', methods=['POST'])
def add_friend(username):
    logged_user = request.get_json()['loggedusername']
    status, msg = DatabaseInsertHandler().insert_friends(username1=logged_user,username2=username)
    result = jsonify({'error': not status, 'message': msg})
    return result

@app.route('/users/<username>/checkFriend', methods=['POST'])
def check_friends(username):
    logged_user = request.get_json()['loggedusername']
    status = DatabaseChecker().check_friends(username1=logged_user, username2=username) #returns true if they are NOT friends
    result = jsonify({'error': status})
    return result

@app.route('/users/<username>/deleteFriend', methods=['POST'])
def delete_friend(username):
    logged_user = request.get_json()['loggedusername']
    status = DatabaseDeleteHandler().delete_friend(username1=logged_user, username2=username)
    result = jsonify({'error': not status})
    return result


@app.route('/charge', methods=['POST'])
def charge():

    global amount #the value is defined when the event page is loaded
    global name

    description="Payment for CheerApp event " + str(name)

    stripe_keys = {
        #'secret_key': os.getenv('STRIPE_SECRET_KEY'),
        #'publishable_key': os.getenv('STRIPE_PUBLISHABLE_KEY')
        'publishable_key': 'pk_test_vmJlznHnNFRVjoz1ed3PWCaZ00urrW39vK',
        'secret_key': 'sk_test_kFA90HNMGaHdvNt27R5Yx44q00k864ydbO'
    }

    stripe.api_key = stripe_keys['secret_key']
    email = request.form['stripeEmail']
    customer = stripe.Customer.create(
        email=email,
        source=request.form['stripeToken']
    )
    stripe.Charge.create(
        customer=customer.id,
        amount=int(amount),
        currency='eur',
        description=description
    )

    return redirect("http://localhost:3000/", code=302)

if __name__ == '__main__':
    app.run(debug=True)
