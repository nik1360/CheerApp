from database.db_insert_handler import DatabaseInsertHandler



class Organizer:
    def __init__(self, username=None, password=None, email=None, phone=None, name=None, surname=None,
                 date_of_birth=None, avg_rating=None):
        self.username = username
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        self.date_of_birth = date_of_birth
        self.phone = phone
        self.avg_rating = avg_rating
        self.organized_events = []


    def organize_event(self, event):
        result, msg = DatabaseInsertHandler().insert_event(event)
        return result, msg


