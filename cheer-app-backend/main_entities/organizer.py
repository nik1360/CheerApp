from database.db_insert_handler import DatabaseInsertHandler

class Organizer:
    def __init__(self, username='', password='', email='', phone='', name='', surname='',
                 date_of_birth='1996-11-19', num_ratings = 0, avg_rating=0):
        self.username = username
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        self.date_of_birth = date_of_birth
        self.phone = phone
        self.num_ratings = num_ratings
        self.avg_rating = avg_rating
        self.organized_events = []


