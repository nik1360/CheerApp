from .db_checker import DatabaseChecker
from .db_manager import DatabaseManager
import bcrypt
from database.db_checker import DatabaseChecker

# Class that handles the deletes in the database
class DatabaseDeleteHandler(DatabaseManager):
    def __init__(self):
        DatabaseManager.__init__(self)
        self.checker = DatabaseChecker()

    def delete_friend(self, username1, username2):
        if self.checker.check_friends(username1, username2):  # check if they are friends
            return False
        else:
            condition = ' WHERE (username1= %s AND username2= %s) OR (username2= %s AND username1= %s)'
            query = 'DELETE FROM ' + self.table_friends + condition
            self.cursor.execute(query, (username1, username2, username1, username2))
            self.db.commit()
            return True

    def delete_event(self, username, event):
        if self.checker.check_event_organizer(username,event):
            return False
        else:
            condition = ' WHERE (organizer_username = %s AND code = %s)'
            query = 'DELETE FROM ' + self.table_events + condition
            self.cursor.execute(query, (username, event.code))
            self.db.commit()
            return True

    def delete_attendance(self,username, event_code):
        condition = ' WHERE (username = %s AND event_code = %s)'
        query = 'DELETE FROM ' + self.table_users_events + condition
        self.cursor.execute(query, (username, event_code))
        self.db.commit()
        return True, username + " won't attend event " + event_code + "!"

    def delete_rating(self, username, event_code):
        condition = ' WHERE (user_username = %s AND event_code = %s)'
        query = 'DELETE FROM ' + self.table_ratings + condition
        self.cursor.execute(query, (username, event_code))
        self.db.commit()
        return True, "Rating successfully deleted!"
