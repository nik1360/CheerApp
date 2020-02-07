from database.db_event_handler import DatabaseEventHandler
from database.db_users_handler import DatabaseUsersHandler

from opencage.geocoder import OpenCageGeocode
from geopy.distance import geodesic

import os

def assign_distance_score(event_city, user_city):
    distance = geodesic(user_city, event_city).km  # compute the distance between the cities
    dist_points = 0
    if distance == 0:
        dist_points = 60
    elif 0 < distance <= 10:
        dist_points = 50
    elif 10 <= distance <= 20:
        dist_points = 40
    elif 20 <= distance <= 30:
        dist_points = 30
    elif 30 <= distance <= 40:
        dist_points = 20
    elif 40 <= distance <= 50:
        dist_points = 20
    elif distance > 50:
        dist_points = 0

    return dist_points


class SuggestionMaker:
    def __init__(self, logged_username, today_date):
        self.logged_username= logged_username
        self.today_date = today_date
        self.geocoder = OpenCageGeocode(os.getenv('GEOCODE_ACCESS_ID'))  # api https://opencagedata.com

    def suggest_event(self):
        # retrieve all the events
        event_list = DatabaseEventHandler().search(False, False, False)
        future_events = []
        # select only the upcoming ones
        for e in event_list:
            if e.date > self.today_date:
                future_events.append(e)
        # get the details of the logged user
        _, user, _ = DatabaseUsersHandler().find_user_username(self.logged_username)

        # retrieve latitude and longitude of the user city
        lat_long = self.geocoder.geocode(user.city + ', Italy')
        user_city = (lat_long[0]['geometry']['lat'], lat_long[0]['geometry']['lng'])

        # initializations of the scores
        max_pts = 0
        genre_points = 0
        price_points = 0
        winner = None

        for e in future_events:
            _, org, _ = DatabaseUsersHandler().find_organizer_username(e.organizer)
            # retrieve latitude and longitude of the event city
            lat_long = self.geocoder.geocode(e.venue.city + ', Italy')
            event_city = (lat_long[0]['geometry']['lat'], lat_long[0]['geometry']['lng'])

            dist_points = assign_distance_score(event_city=event_city, user_city=user_city)

            if org.avg_rating == 0:  # organizer has no review
                rat_points = 30
            else:
                rat_points = org.avg_rating * 10

            for g, v in e.music_genres.items():
                if user.music_tastes[g] + v > 1:
                    genre_points = genre_points + 10

            # Bonus score if the event entrance price costs less than 15 euros
            if e.price < 15:
                price_points=10

            # Bonus score if the event entrance price costs less than 15 euros
            tot_pts = dist_points + rat_points + genre_points + price_points
            if tot_pts >= max_pts:
                max_pts = tot_pts
                winner = e
        return winner

