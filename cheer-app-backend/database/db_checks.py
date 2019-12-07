class DatabaseChecks:

    def __init__(self):
        pass

    def check_username_email(self, username, email, table_name):
        query = None
        if table_name == 'USER':
            query = 'SELECT * FROM USER WHERE USERNAME = %s OR EMAIL = %s'
        if table_name == 'ORGANIZER':
            query = 'SELECT * FROM ORGANIZER WHERE USERNAME = %s OR EMAIL = %s'
        self.cursor.execute(query, (username, email))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    def check_event_existence(self, code):
        query = 'SELECT * FROM EVENT WHERE CODE = %s'
        self.cursor.execute(query, (code,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    def check_venue_availability(self, venue_code, date):
        query = 'SELECT * FROM EVENT WHERE VENUE_CODE = %s AND DATE = %s'
        self.cursor.execute(query, (venue_code, date,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

    def check_venue_existence(self, code):
        query = 'SELECT * FROM VENUE WHERE CODE = %s'
        self.cursor.execute(query, (code,))
        query_result = self.cursor.fetchall()
        if not query_result:
            return True
        else:
            return False

