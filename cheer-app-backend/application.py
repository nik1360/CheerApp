from flask import Flask, jsonify, request, json, redirect
import datetime

from database.db_manager import DatabaseManager, logout
from database.db_insert_handler import DatabaseInsertHandler
from database.db_event_handler import DatabaseEventHandler
from database.db_checker import DatabaseChecker
from database.db_delete_handler import DatabaseDeleteHandler
from database.db_users_handler import DatabaseUsersHandler
from database.db_update_handler import DatabaseUpdateHandler

from main_entities.registered_user import RegisteredUser
from main_entities.venue import Venue
from main_entities.event import Event
from main_entities.organizer import Organizer
from suggestion_maker import SuggestionMaker

from dotenv import load_dotenv
import os
import stripe
import boto3

def retrieve_genre_flags():
    flag_rock = request.get_json()['flagrock']
    flag_hiphop = request.get_json()['flaghiphop']
    flag_reggae = request.get_json()['flagreggae']
    flag_reggaeton = request.get_json()['flagreggaeton']
    flag_techno = request.get_json()['flagtechno']
    flag_electronic = request.get_json()['flagelectronic']
    return flag_rock, flag_hiphop, flag_reggae, flag_reggaeton, flag_techno, flag_electronic


application = app = Flask(__name__)
db_insert = DatabaseInsertHandler()
db_delete = DatabaseDeleteHandler()

logged_user = None
login_status = False

amount = 0
name = 0

load_dotenv()

s3 = boto3.resource('s3', aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                        aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'))
# ------------------------------------------------FUNCTIONS RELATED TO THE USERS --------------------------------
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

    try:
        login_status, logged_user, msg = DatabaseManager().login(username, password, organizer_will_login)
        if login_status:
            result = jsonify({'username': logged_user.username, 'error': False})
        else:
            result = jsonify({"error": True, 'message': msg})
        return result
    except Exception as e:
        print (str(e))
        login_status=False
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

@app.route('/logout', methods=['POST'])
def logout_user_organizer():
    global login_status
    global logged_user
    try:
        login_status, logged_user, msg = logout()
        result = jsonify({'message': msg, 'error': login_status})
        return result
    except Exception as e:
        print (str(e))
        login_status = True
        msg= 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})




@app.route('/register/<type_of_user>', methods=['POST'])
def register(type_of_user):
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = request.get_json()['password']
    first_name = request.get_json()['firstname']
    last_name = request.get_json()['lastname']
    date_of_birth = request.get_json()['dateofbirth']

    try:
        if type_of_user == 'organizer':  # register an organizer
            phone_number = request.get_json()['phonenumber']
            status, msg = db_insert.insert_organizer(
                Organizer(username, password, email, phone_number, first_name, last_name,
                          date_of_birth))

        else:
            city = request.get_json()['city']
            nationality = request.get_json()['nationality']
            flag_rock, flag_hiphop, flag_reggae, flag_reggaeton, flag_techno, flag_electronic = retrieve_genre_flags()
            status, msg = db_insert.insert_user(RegisteredUser(username, password, email, first_name, last_name,
                                                               date_of_birth, city, nationality, flag_rock, flag_hiphop,
                                                               flag_reggae, flag_reggaeton, flag_techno,
                                                               flag_electronic))

        result = jsonify({'error': not status, 'message': msg})
        return result
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/users/<username>/getDetails', methods=['POST'])
def retrieve_user_info(username):
    try:
        status, user, msg = DatabaseUsersHandler().find_user_username(username=username)
        invitations_list = DatabaseUsersHandler().get_invitations_list(username=username)
        if status:

            DatabaseEventHandler().retrieve_joined_events(user=user)
            _, f_list, _ = DatabaseUsersHandler().get_friends_list(username)
            user.friends_list.append(f_list)
            json_user = json.dumps(user, default=lambda o: o.__dict__, indent=4)
            json_friends = json.dumps(user.friends_list, default=lambda o: o.__dict__, indent=4)
            json_events = json.dumps(user.joined_events, default=lambda o: o.__dict__, indent=4)
            json_invitations = json.dumps(invitations_list, default=lambda o: o.__dict__, indent=4)
            result = jsonify(
                {'user': json_user, 'joined_events': json_events, 'friends': json_friends, 'invitations': json_invitations,
                 'error': not status, 'message': msg})
        else:
            result = jsonify({'user': None, 'error': True, 'message': msg})
        return result

    except Exception as e:
        print (str(e))
        msg='OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

@app.route('/organizers/<username>/getDetails', methods=['POST'])
def retrieve_organizer_info(username):
    try:
        status, organizer, msg = DatabaseUsersHandler().find_organizer_username(username=username)
        if status:

            DatabaseEventHandler().retrieve_organized_events(organizer=organizer)
            json_organizer = json.dumps(organizer, default=lambda o: o.__dict__, indent=4)
            #json_events = json.dumps(user.joined_events, default=lambda o: o.__dict__, indent=4)

            result = jsonify(
                {'organizer': json_organizer, 'error': not status, 'message': msg})
        else:
            result = jsonify({'user': None, 'error': True, 'message': msg})
        return result

    except Exception as e:
        print (str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})


@app.route('/users/search', methods=['POST'])
def search_users():
    # retrieve information from the client
    username = request.get_json()['username']
    city = request.get_json()['city']
    flag_rock, flag_hiphop, flag_reggae, flag_reggaeton, flag_techno, flag_electronic = retrieve_genre_flags()
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

    try:
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

    except Exception as e:
        print (str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

@app.route('/users/<username>/addFriend', methods=['POST'])
def add_friend(username):
    logged_user = request.get_json()['loggedusername']
    try:
        status, msg = DatabaseInsertHandler().insert_friends(username1=logged_user,username2=username)
        result = jsonify({'error': not status, 'message': msg})
        return result

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/users/<username>/checkFriend', methods=['POST'])
def check_friends(username):
    logged_user = request.get_json()['loggedusername']
    try:
        status = DatabaseChecker().check_friends(username1=logged_user, username2=username) #returns true if they are NOT friends
        result = jsonify({'error': status})
        return result
    except Exception as e:
        print (str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

@app.route('/users/<username>/deleteFriend', methods=['POST'])
def delete_friend(username):
    logged_user = request.get_json()['loggedusername']
    try:
        status = DatabaseDeleteHandler().delete_friend(username1=logged_user, username2=username)
        result = jsonify({'error': not status})
        return result
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

@app.route('/users/<username>/acceptInvitation', methods=['POST'])
def accept_invitation(username):
    sender = request.get_json()['sender']
    event_code = request.get_json()['event_code']
    try:
        status, msg = DatabaseInsertHandler().insert_users_events(user_username=username, event_code=event_code)
        DatabaseDeleteHandler().delete_invitation(sender=sender, recipient=username, event_code=event_code)
        result = jsonify({'error': not status, 'message': msg})
        return result

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

@app.route('/users/<username>/refuseInvitation', methods=['POST'])
def refuse_invitation(username):
    sender = request.get_json()['sender']
    event_code = request.get_json()['event_code']
    try:
        DatabaseDeleteHandler().delete_invitation(sender=sender, recipient=username, event_code=event_code)
        result = jsonify({'error': False, 'message': 'ok'})
        return result

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

#-----------------------------------------FUNCTIONS RELATED TO THE EVENTS----------------------------------------
@app.route('/events/search', methods=['POST'])
def find_events():
    # retrieve information from the client
    date = request.get_json()['date']
    city = request.get_json()['city']
    flag_rock, flag_hiphop, flag_reggae, flag_reggaeton, flag_techno, flag_electronic = retrieve_genre_flags()
    criteria_city = request.get_json()['criteriacity']
    criteria_date = request.get_json()['criteriadate']
    criteria_genres = request.get_json()['criteriagenres']

    # search the events basing on the selected criteria
    try:
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

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/events/<event_code>/ask', methods=['POST'])
def ask(event_code):
    org_username = request.get_json()['username']
    try:
        status, org, msg = DatabaseEventHandler().retrieve_organizer_details(org_username)
        if status:
            result = jsonify({'email': org.email, 'error': False, 'message': msg})
        else:
            result = jsonify({'error': True, 'message': msg})
        return result
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



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
    flag_rock, flag_hiphop, flag_reggae, flag_reggaeton, flag_techno, flag_electronic = retrieve_genre_flags()
    organizer = request.get_json()['organizer']

    try:
        venue = DatabaseChecker().retrieve_venue(venue_name, city, address)
        if venue is None:
            venue = Venue(venue_name, city, address)
            db_insert.insert_venue(venue)

        ev = Event(name=name, description=description, price=price, venue=venue,
                   organizer=organizer, date=date, start_time=start_time, end_time=end_time,
                   flag_rock=flag_rock, flag_hiphop=flag_hiphop, flag_reggae=flag_reggae,
                   flag_reggaeton=flag_reggaeton, flag_techno=flag_techno,
                   flag_electronic=flag_electronic)

        status, msg = db_insert.insert_event(ev)

        if status:
            result = jsonify({'event_code': ev.code, 'error': False, 'message': msg})
        else:
            result = jsonify({'error': True, 'message': msg})
        return result

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/events/<event_code>/rate', methods=['POST'])
def rate(event_code):
    user_username = request.get_json()['user_username']
    organizer_username = request.get_json()['organizer_username']
    #event_code = request.get_json()['event_code']
    rating = request.get_json()['rating_value']
    try:
        status, msg = db_insert.insert_rating(user=user_username, organizer=organizer_username,
                                              event_code=event_code, rating=rating)
        DatabaseUpdateHandler().update_avg_rating_add(organizer=organizer_username, new_rating=rating)

        result = jsonify({'error': not status, 'message': msg})
        return result
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/events/<event_code>/deleteRating', methods=['POST'])
def delete_rate(event_code):
    user_username = request.get_json()['user_username']
    organizer_username = request.get_json()['organizer_username']
    #try:
    DatabaseUpdateHandler().update_avg_rating_rem(organizer=organizer_username, event=event_code, user=user_username)
    status,msg = db_delete.delete_rating(username=user_username, event_code=event_code)

    result = jsonify({'error': not status, 'message': msg})
    return result
    #except Exception as e:
     #   print(str(e))
      #  msg = 'OPS! There is an error in our servers!'
       # return jsonify({'error': True, 'message': msg})



@app.route('/events/<event_code>/attend', methods=['POST'])
def attend(event_code):
    user_username = request.get_json()['user_username']
    try:
        status,msg = db_insert.insert_users_events(user_username=user_username, event_code=event_code)
        result = jsonify({'error': not status, 'message': msg})
        return result
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/events/<event_code>/notAttend', methods=['POST'])
def not_attend(event_code):
    user_username = request.get_json()['user_username']
    try:
        status,msg = db_delete.delete_attendance(username=user_username, event_code=event_code)
        result = jsonify({'error': not status, 'message': msg})
        return result
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/events/<event_code>/userstatus', methods=['POST'])
def check_user_event_status(event_code):
    user_username = request.get_json()['user_username']

    try:
        rating_status, rating=DatabaseChecker().check_rating_existence(user=user_username,event_code=event_code)
        attend_status = DatabaseChecker().check_event_attendance(user_username=user_username, event_code=event_code)
        f2 = []
        f3 = []
        if user_username != '':  # a user is logged in
            _, friends, msg = DatabaseUsersHandler().get_friends_list(user_username)
            if friends is not None:
                for f in friends:  # the friend f attend the event
                    if not DatabaseChecker().check_event_attendance(user_username=f, event_code=event_code):
                        f2.append(f)
                    else:
                        f3.append(f)

        result = jsonify({'show_rating': rating_status, 'show_attend': attend_status, 'rating': rating,
                          'friends_attend_event': f2, 'friends_not_attend_event': f3})
        return result
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})



@app.route('/events/<event_code>/getDetails', methods=['POST'])
def retrieve_event_info(event_code):
    global amount  # used by charge function
    global name

    try:
        status, event, msg = DatabaseEventHandler().retrieve_event_by_code(event_code=event_code)
        if status:
            event = event[0]
            amount = event.price * 100
            name = event.name

            json_event = json.dumps(event, default=lambda o: o.__dict__, indent=4)
            result = jsonify(
                {'event': json_event, 'stripe_pub_key': os.getenv('STRIPE_PUB_KEY'), 'error': False,
                 'message': msg})
        else:
            result = jsonify({'event': None, 'error': True, 'message': msg})
        return result

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

@app.route('/events/<event_code>/inviteFriend', methods=['POST'])
def invite_friend(event_code):
    sender = request.get_json()['sender']
    recipient = request.get_json()['recipient']
    event_name = request.get_json()['event_name']
    try:
        status = DatabaseInsertHandler().insert_invitation(sender=sender, recipient=recipient, event_code=event_code,
                                                           event_name=event_name)
        if status:
            result = jsonify({'error': False, 'message': 'Invitation sent correctly'})
        else:
            result = jsonify({'error': True, 'message': 'You have already invited your friend to the event'})
        return result

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})


# --------------------------------FUNCTION THAT MANAGE THE EVENT SUGGESTION ------------------------------------------
@app.route('/suggestEvent', methods=['POST'])
def suggest():
    logged_username = request.get_json()['logged_username']
    today_date = request.get_json()['today_date']
    winner = SuggestionMaker(logged_username=logged_username, today_date=today_date).suggest_event()
    json_winner = json.dumps(winner, default=lambda o: o.__dict__, indent=4)
    return jsonify({'winner': json_winner, 'error': False})


# ---------------------------------FUNCTION THAT MANAGE THE COMMUNICATION WITH THE STRIPE PLATFORM -------------------
@app.route('/charge', methods=['POST'])
def charge():

    global amount #the value is defined when the event page is loaded
    global name


    description="Payment for CheerApp event " + str(name)
    stripe_keys = {
        # 'secret_key': os.getenv('STRIPE_SECRET_KEY'),
        # 'publishable_key': os.getenv('STRIPE_PUBLISHABLE_KEY')
        'publishable_key': os.getenv('STRIPE_PUB_KEY'),
        'secret_key': os.getenv('STRIPE_PVT_KEY')
    }

    try:
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
        return redirect("/", code=302)

    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

#----------------------------------FILE UPLOAD --------------------------------------------
@app.route('/<category>/<username>/uploadAvatar', methods=['POST'])
def upload_avatar(category, username):
    global s3

    try:
        s3.Bucket('cheerapp').put_object(Key=category + '/'+request.form['filename'], Body=request.files['avatar'])
        return jsonify({'error': False, 'message': 'ok'})
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})

#----------------------------------FILE UPLOAD --------------------------------------------
@app.route('/events/<event_code>/uploadFlyer', methods=['POST'])
def upload_flyer(event_code):
    global s3
    try:
        s3.Bucket('cheerapp').put_object(Key='events/'+request.form['filename'], Body=request.files['flyer'])
        return jsonify({'error': False, 'message': 'ok'})
    except Exception as e:
        print(str(e))
        msg = 'OPS! There is an error in our servers!'
        return jsonify({'error': True, 'message': msg})





if __name__ == '__main__':
    app.run(debug=True)
