class Organizer:
    def __init__(self, username, email, password, phone, name, surname,
                 date_of_birth, nationality):
        self.username = username
        self.email = email
        self.password = password
        self.name = name
        self.surname = surname
        self.date_of_birth = date_of_birth
        self.nationality = nationality
        self.phone = phone
        self.organized_events = []