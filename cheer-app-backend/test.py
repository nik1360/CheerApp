from database.db_event_finder import DatabaseEventFinder
from registered_user import RegisteredUser
from organizer import Organizer
from event import Event
from venue import Venue


db_search = DatabaseEventFinder("Milan", "2019-12-23", False, False, False, False, False, True)
db_search.search_city('GENRES')




