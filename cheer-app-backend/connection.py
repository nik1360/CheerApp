from flask import Flask, jsonify, request, json

from database.db_manager import DatabaseManager, logout
from database.db_insert_handler import DatabaseInsertHandler
from organizer import  Organizer


app = Flask(__name__)
db=DatabaseManager()
db_insert = DatabaseInsertHandler()

logged_user = None
login_status = False

@app.route('/users/login', methods=['POST'])
def login_user():
    username = request.get_json()['username']
    password = request.get_json()['password']

    login_status, logged_user, msg = db.login(username, password, False)
    if login_status:
        result = jsonify({'username': logged_user.username, 'email': logged_user.email, 'error': False})
    else:
        result = jsonify({"error": msg})
    return result


@app.route('/organizers/login', methods=['POST'])
def login_organizer():
    username = request.get_json()['username']
    password = request.get_json()['password']

    login_status, logged_user, msg = db.login(username, password, True)
    if login_status:
        result = jsonify({'username': logged_user.username, 'email': logged_user.email, 'error': False})
    else:
        result = jsonify({"error": msg})
    return result

@app.route('/logout', methods=['POST'])
def logout_user_organizer():
    login_status, logged_user, msg = logout()
    if not login_status:
        result = jsonify({'message': msg, 'error': False})
    else:
        result = jsonify({"error": msg})
    return result

@app.route('/organizers/register', methods=['POST'])
def register_organizer():
    username = request.get_json()['username']
    email = request.get_json()['email']
    password = request.get_json()['password']
    first_name = request.get_json()['firstname']
    last_name = request.get_json()['lastname']
    date_of_birth = request.get_json()['dateofbirth']
    phone_number = request.get_json()['phonenumber']

    status, msg = db_insert.insert_organizer(Organizer(username,password,email,phone_number,first_name,last_name,date_of_birth))

    if status:
        result = jsonify({'error': False, 'message':msg})
    else:
        result = jsonify({"error": msg})
    return result



if __name__ == '__main__':
    app.run(debug=True)