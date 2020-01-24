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

results = geocoder.geocode('Mortara, Italy')
city1=(results[0]['geometry']['lat'],results[0]['geometry']['lng'])

results = geocoder.geocode('Pavia, Italy')
city2=(results[0]['geometry']['lat'],results[0]['geometry']['lng'])

print (city1)
print (city2)

print(geodesic(city1, city2).km)
