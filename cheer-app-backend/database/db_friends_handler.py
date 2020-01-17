from database.db_manager import DatabaseManager
from registered_user import RegisteredUser

# class that manages interactions between users
class DatabaseFriendsHandler(DatabaseManager):
    def __init__(self):
        DatabaseManager.__init__(self)
    # search a user by its username
    def find_user_username(self, username):
        query = 'SELECT * FROM ' + self.table_users + ' WHERE username=%s'
        self.cursor.execute(query, (username,))
        r = self.cursor.fetchone()
        if not r:
            msg = 'User does not exist!'
            return False, None, msg
        else:
            user = RegisteredUser(username=r[0], password=r[1], email=r[2], name=r[3], surname=r[4], date_of_birth=str(r[5]),
                                  city= r[6], nationality=r[7], flag_rock=r[8], flag_hiphop=r[9], flag_reggaeton=r[10],
                                  flag_reggae=r[11], flag_techno=r[12], flag_electronic=r[13])
            msg = 'User ' + username + ' exists!'
            return True, user, msg

    # find the users in a particular city
    def find_user_city(self, city):
        query = 'SELECT username, name FROM ' + self.table_users + ' WHERE city=%s'
        self.cursor.execute(query, (city,))

        result = self.cursor.fetchall()
        if not result:
            msg = 'No user in ' + city + '!'
            return False, None, msg
        else:
            user_list = []
            for r in result:
                user_list.append({r[0], r[1]})  # create a tuple with username and name

            msg = 'There are users in  ' + city + '!'
            return True, user_list, msg

    # Get the friend list of an user
    def get_friends_list(self, username):
        friends_list = []
        query = 'SELECT username2 FROM ' + self.table_friends + ' WHERE username1 = %s'
        self.cursor.execute(query, (username,))
        result1 = self.cursor.fetchall()
        query = 'SELECT username1 FROM ' + self.table_friends + ' WHERE username2 = %s'
        self.cursor.execute(query, (username,))
        result2 = self.cursor.fetchall()

        for r in result1:
            friends_list.append(r[0])
        for r in result2:
            friends_list.append(r[0])

        if not friends_list:
            msg = 'User have no friends'
            return False, None, msg
        else:
            msg = 'Showing friends of the user: ' + username
            return True, friends_list, msg
