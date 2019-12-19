import string
import random


class Event:
    def __init__(self, name, description, price, venue, organizer, date, start_time, end_time,
                 flag_rock, flag_hiphop, flag_reggaeton, flag_reggae, flag_techno, flag_electronic):
        self.code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
        self.name = name
        self.description = description
        self.price = price
        self.venue = venue
        self.organizer = organizer
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

    def print_details(self):
        print('Name: ' + self.name)
        print('Description: ' + self.description)
        print('Price: ' + str(self.price) + '€')
        print('Date: ' + str(self.date))
        print('Venue: ' + self.venue.name)
        print('Address: ' + self.venue.city + ', ' + self.venue.address)
        print('Start time: ' + str(self.start_time))
        print('End time: ' + str(self.end_time))
        genres_string = 'Music Genres: '
        for genre, value in self.music_genres.items():
            if value:
                genres_string = genres_string + genre + ' '
        print(genres_string)
        print ('----------------------------------')

