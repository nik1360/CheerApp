from database.db_friends_handler import DatabaseFriendsHandler
from database.db_event_handler import DatabaseEventHandler
from database.db_insert_handler import DatabaseInsertHandler


class RegisteredUser:
    def __init__(self, username, password, email,  name, surname,
                 date_of_birth,  city, nationality, flag_rock, flag_hiphop,
                 flag_reggaeton, flag_reggae, flag_techno, flag_electronic):
        self.username = username
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        self.date_of_birth = date_of_birth
        self.nationality = nationality
        self.city = city
        self.music_tastes = {
            "rock": flag_rock,
            "hiphop": flag_hiphop,
            "reggaeton": flag_reggaeton,
            "reggae": flag_reggae,
            "techno": flag_techno,
            "electronic": flag_electronic
        }
        self.friends_list = []  # contains the username of each friend
        self.joined_events = []

    def join_event(self,event):
        result, msg = DatabaseInsertHandler().insert_users_events(self,event)
        return result, msg

    def add_friend(self, username2):
        result, msg = DatabaseInsertHandler().insert_friends(self.username, username2)
        return result, msg

    def retrieve_friends_list(self):
        DatabaseFriendsHandler().retrieve_friends_list(self)

    def retrieve_joined_events_list(self):
        result, msg = DatabaseEventHandler().retrieve_joined_events(self)
        return result,msg


