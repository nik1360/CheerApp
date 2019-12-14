from database.db_manager import DatabaseManager


class DatabaseFriendsHandler(DatabaseManager):
    def __init__(self):
        DatabaseManager.__init__(self)

    def find_user_username(self, username):
        query = 'SELECT username, name, city FROM ' + self.table_users + ' WHERE username=%s'
        self.cursor.execute(query, (username,))
        result = self.cursor.fetchall()
        if not result:

            msg = 'User does not exist!'
            return False, None, msg
        else:
            details = {result[0][0], result[0][1], result[0][2]}  # create a tuple with username, name and city
            msg = 'User ' + username + ' exists!'
            return True, details, msg

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

    def retrieve_friends_list(self, user):
        query = 'SELECT username2 FROM ' + self.table_friends + ' WHERE username1 = %s'
        self.cursor.execute(query, (user.username,))
        result = self.cursor.fetchall()
        for r in result:
            user.friends_list.append(r[0])

        query = 'SELECT username1 FROM ' + self.table_friends + ' WHERE username2 = %s'
        self.cursor.execute(query, (user.username,))
        result = self.cursor.fetchall()
        for r in result:
            user.friends_list.append(r[0])
