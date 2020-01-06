cd venvfrom database.db_event_handler import DatabaseEventHandler
from database.db_manager import DatabaseManager,logout
from database.db_checker import DatabaseChecker

from registered_user import RegisteredUser
from event import Event


db = DatabaseManager()
db_checker=DatabaseChecker()
db_search = DatabaseEventHandler("Turin", "2019-12-23", False, True, False, False, False, True)
event_list = db_search.search(False, False, False)  # create a list that contains all the events
for e in event_list:
    e.print_details()

login_status, logged_user, msg = db.login('jack', 'password', True)
print(msg)
_, msg =logged_user.retrieve_organized_events()
print(msg)
for e in logged_user.organized_events:
    e.print_details()
