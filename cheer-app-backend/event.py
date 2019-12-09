import string
import random


class Event:
    def __init__(self, name, description, price, venue, date, start_time, end_time,
                 flag_rock, flag_hiphop, flag_reggaeton, flag_reggae, flag_techno, flag_electronic):
        self.code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
        self.name = name
        self.description = description
        self.price = price
        self.venue = venue
        self.date = date
        self.start_time = start_time
        self.end_time = end_time
        self.music_genres = {
            "rock": flag_rock,
            "hiphop": flag_hiphop,
            "reggaeton": flag_reggaeton,
            "reggae": flag_reggae,
            "techno": flag_techno,
            "electronic": flag_electronic
        }

