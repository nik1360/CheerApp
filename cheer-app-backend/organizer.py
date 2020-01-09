from database.db_insert_handler import DatabaseInsertHandler



class Organizer:
    def __init__(self, username, password, email, phone, name, surname,date_of_birth):
        self.username = username
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        self.date_of_birth = date_of_birth
        self.phone = phone
        self.organized_events = []

    def organize_event(self, event):
        result, msg = DatabaseInsertHandler().insert_event(event)
        return result, msg


