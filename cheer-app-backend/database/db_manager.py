import mysql.connector
import bcrypt
import os

# function that logs out a user or an organizer, setting logged_user to None
def logout():
    login_status = False
    msg = 'User logged out!'
    return login_status, None, msg

# Base class that allow the interaction with the mySQL database
class DatabaseManager:
    def __init__(self):
        self.db = mysql.connector.connect(
            #host='localhost',    # needed to run the test
            host=os.getenv('DB_HOST'),   # comment this if you are doing testing
            port='3306',
            user=os.getenv('DB_USER'),
            passwd=os.getenv('DB_PWD'),
            database='cheerapp',
            auth_plugin='mysql_native_password'
        )
        self.cursor = self.db.cursor()
        self.table_users = 'users'
        self.table_organizers = 'organizers'
        self.table_events = 'events'
        self.table_venues = 'venues'
        self.table_friends = 'friends'
        self.table_users_events = 'users_events'
        self.table_ratings = 'ratings'
        self.table_invitations = 'invitations'

    # method that logs in a user or an organizer, returning a User object or an Organizer object
    def login(self, username, password, login_organizer):
        if not login_organizer:  # a user is trying to log in
            table_name = self.table_users
            tmp = 'user'
        else:  # an organizer will ry to log in
            table_name = self.table_organizers
            tmp = 'organizer'
        query = 'SELECT * from ' + table_name + ' WHERE username=%s'
        self.cursor.execute(query, (username,))
        res = self.cursor.fetchone()  # list containing the row of the result of the query
        if not res:  # no record in the database corresponds to the combination username + password
            login_status = False
            msg = 'No ' + tmp + ' registered with the username ' + username
            return login_status, None, msg
        # retrieve hashed password from the database
        hashed = res[1]
        hashed = bytes(hashed, 'UTF-8') # convert in bytes the string of the hashed password
        password = bytes(password,'UTF-8')  # convert in bytes the string the password

        if bcrypt.checkpw(password, hashed):  # check if the password is correct
            login_status = True
            msg = username + ' logged in!'
            if not login_organizer:
                from main_entities.registered_user import RegisteredUser
                return login_status, RegisteredUser(res[0], res[1], res[2], res[3], res[4], res[5],
                                                    res[6], res[7], res[8], res[9], res[10], res[11],
                                                    res[12], res[13]), msg
            else:
                from main_entities.organizer import Organizer
                return login_status, Organizer(res[0], res[1], res[2], res[3], res[4], res[5],
                                               res[6]), msg
        else:
            login_status = False
            msg = "Username and password do not match"
            return login_status, None, msg



    def close_connection(self):
        self.cursor.close()



