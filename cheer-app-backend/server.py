from flask import Flask, jsonify, request, json, Response
import datetime

from database.db_manager import DatabaseManager, logout
from database.db_insert_handler import DatabaseInsertHandler
from database.db_event_handler import DatabaseEventHandler
from database.db_checker import DatabaseChecker
from database.db_delete_handler import DatabaseDeleteHandler
from database.db_friends_handler import DatabaseFriendsHandler

from registered_user import RegisteredUser
from venue import Venue
from event import Event


app = Flask(__name__)
db = DatabaseManager()
db_insert = DatabaseInsertHandler()
db_delete = DatabaseDeleteHandler()

logged_user = None
login_status = False


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

    status, msg = db_insert.insert_event(Event(name=name,description=description,price=price,venue=venue,
                                              organizer=organizer,date=date,start_time=start_time, end_time=end_time,
                                              flag_rock=flag_rock, flag_hiphop=flag_hiphop, flag_reggae=flag_reggae,
                                               flag_reggaeton=flag_reggaeton,flag_techno=flag_techno,
                                               flag_electronic=flag_electronic))
    status=True
    msg='ok'
    if status:
        result = jsonify({'error': False, 'message':msg})
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
        _ , friends, msg = DatabaseFriendsHandler().get_friends_list(user_username)
        for f in friends: # the friend f attend the event
            if not DatabaseChecker().check_event_attendance(user_username=f, event_code=event_code):
                f2.append(f)

    result = jsonify({'show_rating': rating_status, 'show_attend': attend_status, 'rating':rating,
                      'friends_attend_event': f2})
    return result


if __name__ == '__main__':
    app.run(debug=True)
