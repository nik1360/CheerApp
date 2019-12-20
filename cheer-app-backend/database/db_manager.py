import mysql.connector
import bcrypt

# function that logs out a user or an organizer, setting logged_user to None
def logout(login_status):
    if login_status:
        login_status = False
        msg = 'User logged out!'
    else:
        msg = 'No user was logged in, impossible to log out!'
    return login_status, None, msg

# Base class that allow the interaction with the mySQL database
class DatabaseManager:
    def __init__(self):
        self.db = mysql.connector.connect(
            host='localhost',
            user='CheerApp',
            passwd='Cheer4pp',
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

    # method that logs in a user or an organizer, returning a User object or an Organizer object
    def login(self, username, password, login_organizer):
        if not login_organizer:  # a user is trying to log in
            table_name = self.table_users
        else:  # an organizer will ry to log in
            table_name = self.table_organizers
        query = 'SELECT * from ' + table_name + ' WHERE username=%s'
        self.cursor.execute(query, (username,))
        res = self.cursor.fetchall()  # list containing the row of the result of the query
        if not res:  # no record in the database corresponds to the combination username + password
            login_status = False
            msg = 'Username ' + username + ' does not exist'
            return login_status, None, msg
        # retrieve hashed password from the database
        hashed = res[0][1]
        hashed = bytes(hashed, 'UTF-8')  # convert in bytes the string of the hashed password
        password = bytes(password, 'UTF-8')  # convert in bytes the string the password

        if bcrypt.checkpw(password, hashed):  # check if the password is correct
            login_status = True
            msg = username + ' logged in!'
            if not login_organizer:
                from registered_user import RegisteredUser
                return login_status, RegisteredUser(res[0][0], res[0][1], res[0][2], res[0][3], res[0][4], res[0][5],
                                                    res[0][6], res[0][7], res[0][8], res[0][9], res[0][10], res[0][11],
                                                    res[0][12], res[0][13]), msg
            else:
                from organizer import Organizer
                return login_status, Organizer(res[0][0], res[0][1], res[0][2], res[0][3], res[0][4], res[0][5],
                                               res[0][6]), msg
        else:
            login_status = False
            msg = "Username and password do not match"
            return login_status, None, msg



    def close_connection(self):
        self.cursor.close()



