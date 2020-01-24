from database.db_event_handler import DatabaseEventHandler
from database.db_manager import DatabaseManager,logout
from database.db_checker import DatabaseChecker
from database.db_users_handler import DatabaseUsersHandler

from registered_user import RegisteredUser
from event import Event

from opencage.geocoder import OpenCageGeocode
from geopy.distance import geodesic

key = '5ecf85c019a64e1283c5c1f24dffb2a1'  # get api key from:  https://opencagedata.com

geocoder = OpenCageGeocode(key)


current_date = '2020-01-24'
event_list = DatabaseEventHandler().search(False, False, False)
future_events=[]
for e in event_list:
    if e.date > current_date:
        future_events.append(e)
_, user, _ = DatabaseUsersHandler().find_user_username('nik')

lat_long = geocoder.geocode(user.city+', Italy')
user_city = (lat_long[0]['geometry']['lat'], lat_long[0]['geometry']['lng'])
print('user city: '+ user.city)
print(user.music_tastes)

max_pts=0
winner=None
for e in future_events:
    _, org, _ = DatabaseUsersHandler().find_organizer_username(e.organizer)

    lat_long = geocoder.geocode(e.venue.city + ', Italy')
    event_city = (lat_long[0]['geometry']['lat'], lat_long[0]['geometry']['lng'])
    distance = geodesic(user_city, event_city).km

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

    if org.avg_rating == 0:# organizer has no review
        rat_points = 30
    else:
        rat_points = org.avg_rating*10

    genre_points = 0
    for g, v in e.music_genres.items():
        if user.music_tastes[g] + v > 1:
            genre_points = genre_points + 10

    tot_pts=dist_points+rat_points+genre_points
    if (tot_pts>max_pts):
        max_pts=tot_pts
        winner=e

print('winner is '+winner.name)


