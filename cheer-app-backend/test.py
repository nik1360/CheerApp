from database.db_event_handler import DatabaseEventHandler
from database.db_manager import DatabaseManager,logout
from database.db_checker import DatabaseChecker
from database.db_friends_handler import DatabaseFriendsHandler

from registered_user import RegisteredUser
from event import Event


status, friends, message = DatabaseFriendsHandler().get_friends_list('nik')

for f in friends:
    print(f)