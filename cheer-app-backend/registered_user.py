
class RegisteredUser:
    def __init__(self, username, password=None, email=None,  name=None, surname=None,
                 date_of_birth=None,  city=None, nationality=None, flag_rock=False, flag_hiphop=False,
                 flag_reggaeton=False, flag_reggae=False, flag_techno=False, flag_electronic=False):
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



