from flask import Flask, jsonify, request, json

from database.db_manager import DatabaseManager, logout
from database.db_insert_handler import DatabaseInsertHandler
from organizer import  Organizer
from registered_user import RegisteredUser


app = Flask(__name__)
db = DatabaseManager()
db_insert = DatabaseInsertHandler()

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


if __name__ == '__main__':
    app.run(debug=True)
