from .db_manager import DatabaseManager


# Class that checks if the record can be created into the mySQL database
class DatabaseChecker(DatabaseManager):

    def __init__(self):
        DatabaseManager.__init__(self)
        pass

    def check_username_email(self, username, email, table_name):
        query = 'SELECT * FROM ' + table_name + ' WHERE username = %s OR EMAIL = %s'
        self.cursor.execute(query, (username, email,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    def check_event_existence(self, code):
        query = 'SELECT * FROM ' + self.table_events + ' WHERE code = %s'
        self.cursor.execute(query, (code,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    def check_venue_availability(self, venue_code, date):
        query = 'SELECT * FROM ' + self.table_events + ' WHERE venue_code = %s AND date = %s'
        self.cursor.execute(query, (venue_code, date,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    def check_venue_existence(self, venue_code):
        query = 'SELECT * FROM ' + self.table_venues + ' WHERE code=%s'
        self.cursor.execute(query, (venue_code,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    def check_friends_existence(self, username1, username2):
        condition = '(username1 = %s AND username2=%s) OR (username2=%s AND username1=%s)'
        query = 'SELECT * FROM ' + self.table_friends + ' WHERE ' + condition
        self.cursor.execute(query, (username1, username2, username1, username2))
        query_result = self.cursor.fetchall()
        if not query_result:  # they are not friends yet
            return True
        else:
            return False

