from .db_checker import DatabaseChecker
from .db_manager import DatabaseManager


# Class that handles the insertions in the database
class DatabaseInsertHandler(DatabaseManager):
    def __init__(self):
        DatabaseManager.__init__(self)
        self.checker = DatabaseChecker


    # Register a new user in the database
    def insert_user(self, user):
        if self.checker.check_username_email(user.username, user.email, 'USER'):
            query = 'insert into user values(%s,%s,%s,%s,%s,%s, %s, %s, %s, %s ,%s ,%s, %s, %s) '
            self.cursor.execute(query, (user.username, user.password, user.email, user.name, user.surname,
                                        user.date_of_birth, user.city, user.nationality, user.music_tastes["rock"],
                                        user.music_tastes["hiphop"], user.music_tastes["reggaeton"],
                                        user.music_tastes["reggae"],
                                        user.music_tastes["techno"], user.music_tastes["electronic"],))
            self.db.commit()
            return True
        else:
            print("Username or email already taken (User)")
            return False

    # Register a new organizer in the database
    def insert_organizer(self, organizer):
        if self.checker.check_username_email(organizer.username, organizer.email, 'ORGANIZER'):
            query = 'insert into organizer values(%s,%s,%s,%s,%s,%s,%s,%s) '
            self.cursor.execute(query, (organizer.username, organizer.password, organizer.email, organizer.phone,
                                        organizer.name, organizer.surname, organizer.date_of_birth,
                                        organizer.nationality))
            self.db.commit()
            return True
        else:
            print("Username or email already taken (Organizer)")
            return False

    # Registration of an event
    def insert_event(self, event):
        if self.check_event_existence(event.code):
            self.insert_venue(event.venue)
            if self.check_venue_availability(event.venue.code, event.date):
                query = 'insert into event values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
                self.cursor.execute(query,
                                    (event.code, event.name, event.description, event.price, event.venue.code,
                                     event.date, event.start_time, event.end_time, event.music_genres["rock"],
                                     event.music_genres["hiphop"], event.music_genres["reggaeton"],
                                     event.music_genres["reggae"], event.music_genres["techno"],
                                     event.music_genres["electronic"],))
                self.db.commit()
                return True
            else:
                print("The location is not available for that date!")
                return False
        else:
            print("Event already registered!")
            return False

    # Registration of a venue
    def insert_venue(self, venue):
        if self.check_venue_existence(venue.code):
            print("Venue not present, registeing it now")
            query = 'insert into venue values(%s,%s,%s,%s)'
            self.cursor.execute(query, (venue.code, venue.name, venue.city, venue.address,))
            self.db.commit()
            return True
        else:
            return False
