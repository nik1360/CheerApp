from .db_manager import DatabaseManager
from venue import Venue


# Class that checks if the record can be created into the mySQL database
class DatabaseChecker(DatabaseManager):

    def __init__(self):
        DatabaseManager.__init__(self)
        pass

    # check if the username or the email are already registered
    def check_username_email(self, username, email, table_name):
        query = 'SELECT * FROM ' + table_name + ' WHERE username = %s OR EMAIL = %s'
        self.cursor.execute(query, (username, email,))
        query_result = self.cursor.fetchall()
        if not query_result:    # query_result is empty -> email and username are available
            return True
        else:
            return False

    # check if the event_code is already present in the table events
    # this method is needed because the code is generated randomly
    def check_event_code(self, code):
        query = 'SELECT * FROM ' + self.table_events + ' WHERE code = %s'
        self.cursor.execute(query, (code,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True # query_result is empty -> code is not present yet
        else:
            return False

    # check if the event is already created by checking the combination NAME + VENUE + DATE
    def check_event_existence(self,event):
        query = 'SELECT * FROM ' + self.table_events + ' WHERE name = %s AND venue_code=%s AND date=%s'
        self.cursor.execute(query, (event.name, event.venue.code, event.date))
        query_result = self.cursor.fetchall()
        if not query_result: # the database does not contain the event
            return False
        else:
            return True

    # check if the venue is available in a particular date
    def check_venue_availability(self, venue_code, date):
        query = 'SELECT * FROM ' + self.table_events + ' WHERE venue_code = %s AND date = %s'
        self.cursor.execute(query, (venue_code, date,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    # check if in the table VENUES already exists ta venue
    # by checking NAME+CITY+ADDRESS
    # by checking the code (this control is needed because the venue code is generated randomly)
    def check_venue_existence(self, venue):
        query = 'SELECT * FROM ' + self.table_venues + ' WHERE  name= %s AND city = %s AND address=%s'
        self.cursor.execute(query, (venue.name, venue.city, venue.address,))
        result1 = self.cursor.fetchall()  #name query
        query = 'SELECT * FROM ' + self.table_venues + ' WHERE code=%s'
        self.cursor.execute(query, (venue.code,))
        result2 = self.cursor.fetchall()
        if not (result1 and result2):
            return True
        else:
            return False

    # create a new object venue by taking the values from the database
    def retrieve_venue(self, name, city, address):
        query = 'SELECT * FROM ' + self.table_venues + ' WHERE  name= %s AND city = %s AND address=%s'
        self.cursor.execute(query, (name, city, address,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return None
        else:
            venue=Venue(name,city,address)
            venue.code=query_result[0][0]
            return venue

    # check if two users are already friends
    def check_friends(self, username1, username2):
        condition = '(username1 = %s AND username2=%s) OR (username2=%s AND username1=%s)'
        query = 'SELECT * FROM ' + self.table_friends + ' WHERE ' + condition
        self.cursor.execute(query, (username1, username2, username1, username2))
        query_result = self.cursor.fetchall()
        if not query_result:  # they are not friends yet
            return True
        else:
            return False

    # check if a user already joined a particular event
    def check_joined_events(self, user, event):
        query = 'SELECT * FROM ' + self.table_users_events + ' WHERE (username = %s AND event_code=%s)'
        self.cursor.execute(query, (user.username, event.code,))
        query_result = self.cursor.fetchall()
        if not query_result:  # the user haven't joined the event yet
            return True
        else:   # the user already joined the event
            return False


