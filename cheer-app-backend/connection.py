from flask import Flask, jsonify, request, json
from database.db_manager import DatabaseManager
from flask_cors import CORS

from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)

app = Flask(__name__)
db=DatabaseManager()
jwt = JWTManager(app)

logged_user = None

@app.route('/users/login', methods=['POST'])
def login_user():
    username = request.get_json()['username']
    password = request.get_json()['password']

    login_status, user, msg = db.login(username, password, False)
    if login_status:
        result = jsonify({'username': user.username, 'email': user.email, 'error': False})
    else:
        result = jsonify({"error": msg})
    return result


@app.route('/organizers/login', methods=['POST'])
def login_organizer():
    username = request.get_json()['username']
    password = request.get_json()['password']

    login_status, user, msg = db.login(username, password, True)
    if login_status:
        result = jsonify({'username': user.username, 'email': user.email, 'error': False})
    else:
        result = jsonify({"error": msg})
    return result

if __name__ == '__main__':
    app.run(debug=True)