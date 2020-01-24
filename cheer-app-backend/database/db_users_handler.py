from database.db_manager import DatabaseManager
from registered_user import RegisteredUser
from organizer import Organizer

# class that manages interactions between users
class DatabaseUsersHandler(DatabaseManager):
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
            user = RegisteredUser(username=r[0], password=None, email=r[2], name=r[3], surname=r[4], date_of_birth=str(r[5]),
                                  city= r[6], nationality=r[7], flag_rock=r[8], flag_hiphop=r[9], flag_reggaeton=r[10],
                                  flag_reggae=r[11], flag_techno=r[12], flag_electronic=r[13])
            msg = 'User ' + username + ' exists!'
            return True, user, msg

    def find_organizer_username(self, username):
        query = 'SELECT * FROM ' + self.table_organizers + ' WHERE username=%s'
        self.cursor.execute(query, (username,))
        r = self.cursor.fetchone()
        if not r:
            msg = 'Organizer does not exist!'
            return False, None, msg
        else:
            org = Organizer(username=r[0], email=r[2], phone=r[3], name=r[4], surname=r[5], date_of_birth=r[6],
                            avg_rating=r[9])
            msg = 'Organizer ' + username + ' exists!'
            return True, org, msg

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

    def search(self, username, city, criteria_username, criteria_city, criteria_genres, music_tastes):
        base_query = 'SELECT * FROM ' + self.table_users +' WHERE true'
        query = base_query
        # Construction of the query basing on the search criteria
        if criteria_username:
            query = query + ' AND username=%s'
        if criteria_city:
            query = query + ' AND city=%s'
        if criteria_genres:
            query = query + ' AND ('
            for genre, value in music_tastes.items():
                if value:
                    query = query + self.table_users + '.flag_' + genre + "=true OR "
            query = query[:-4] + ')'  # Remove the last OR (and 2 spaces) from the query
        # Only city and date criteria require parameters, so only them will be tested
        if criteria_city and criteria_username:  # both criteria
            self.cursor.execute(query, (username, city))
        elif criteria_city and not criteria_username:  # city criteria selected
            self.cursor.execute(query, (city,))
        elif not criteria_city and criteria_username:  # date criteria selected
            self.cursor.execute(query, (username,))
        elif not criteria_city and not criteria_username:  # neither city or date criteria
            self.cursor.execute(query)  # if criteria_genres = false, all the events will be showed
        result = self.cursor.fetchall()
        users = []
        for r in result:
            users.append(RegisteredUser(username=r[0], city=r[6], flag_rock=r[8], flag_hiphop=r[9], flag_reggaeton=r[10],
                                        flag_reggae=r[11], flag_techno=r[12], flag_electronic=r[13]))
        return users

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
