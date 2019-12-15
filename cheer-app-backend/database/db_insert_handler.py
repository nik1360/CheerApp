from .db_checker import DatabaseChecker
from .db_manager import DatabaseManager
import bcrypt


# Class that handles the insertions in the database
class DatabaseInsertHandler(DatabaseManager):
    def __init__(self):
        DatabaseManager.__init__(self)
        self.checker = DatabaseChecker()

    # Register a new user in the database
    def insert_user(self, user):

        if self.checker.check_username_email(user.username, user.email, 'USERS'):
            query = 'INSERT INTO ' + self.table_users + ' VALUES(%s,%s,%s,%s,%s,%s, %s, %s, %s, %s ,%s ,%s, %s, %s) '
            self.cursor.execute(query, (user.username, encode_password(user.password), user.email, user.name,
                                        user.surname,user.date_of_birth, user.city, user.nationality,
                                        user.music_tastes["rock"], user.music_tastes["hiphop"],
                                        user.music_tastes["reggaeton"], user.music_tastes["reggae"],
                                        user.music_tastes["techno"], user.music_tastes["electronic"],))
            self.db.commit()
            return True, 'User registered correctly!'
        else:
            return False, 'Username or email already taken!'

    # Register a new organizer in the database
    def insert_organizer(self, organizer):
        if self.checker.check_username_email(organizer.username, organizer.email, 'ORGANIZERS'):
            query = 'INSERT INTO ' + self.table_organizers + ' VALUES(%s,%s,%s,%s,%s,%s,%s)'
            self.cursor.execute(query, (organizer.username, encode_password(organizer.password), organizer.email,
                                        organizer.phone, organizer.name, organizer.surname, organizer.date_of_birth))
            self.db.commit()
            return True, 'Organizer registered correctly!'
        else:
            return False, 'Username or email already taken!'

    # Registration of a venue
    def insert_venue(self, venue):

        if self.checker.check_venue_existence(venue.code):  # the venue is not registered
            query = 'INSERT INTO ' + self.table_venues + ' VALUES(%s,%s,%s,%s)'
            self.cursor.execute(query, (venue.code, venue.name, venue.city, venue.address,))
            self.db.commit()
            return True
        else:
            return False

    # Registration of an event
    def insert_event(self, event):
        if event.venue is None: # the venue is not registered yet
            return False, 'Venue is not registered yet!'
        else:
            if self.checker.check_event_existence(event.code):

                if self.checker.check_venue_availability(event.venue.code, event.date):
                    query = 'INSERT INTO ' + self.table_events + ' VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
                    self.cursor.execute(query,
                                        (event.code, event.name, event.description, event.price, event.venue.code,
                                         event.date, event.start_time, event.end_time, event.music_genres["rock"],
                                         event.music_genres["hiphop"], event.music_genres["reggaeton"],
                                         event.music_genres["reggae"], event.music_genres["techno"],
                                         event.music_genres["electronic"],))
                    self.db.commit()
                    return True, 'Event registered correctly!'
                else:
                    return False, 'The location is not available for that date!'
            else:
                return False, 'Event already registered!'



    def insert_friends(self, username1, username2):
        if self.checker.check_friends_existence(username1, username2):
            query = 'INSERT INTO ' + self.table_friends + ' VALUES (%s, %s)'
            self.cursor.execute(query, (username1, username2,))
            self.db.commit()
            return True, username1 + ' and ' + username2 + ' are now friends!'
        else:
            return False, username1 + ' and ' + username2 + ' were already friends!'


def encode_password(password):
    password = bytes(password, 'UTF-8')
    salt = bcrypt.gensalt()
    hashed = (bcrypt.hashpw(password, salt)).decode('UTF-8')
    return hashed
