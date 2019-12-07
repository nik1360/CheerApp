class RegisteredUser:
    def __init__(self, username, email, password, name, surname,
                 date_of_birth, nationality, city, flag_rock, flag_hiphop,
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
        self.friend_list = []
        self.joined_events = []
