from database.db_event_handler import DatabaseEventHandler
from database.db_manager import DatabaseManager
from database.db_checker import DatabaseChecker

from registered_user import RegisteredUser
from event import Event


db = DatabaseManager()
db_checker=DatabaseChecker()
db_search = DatabaseEventHandler("Turin", "2019-12-23", False, True, False, False, False, True)
event_list = db_search.search(False, False, False)  # create a list that contains all the events

login_status, logged_user, msg = db.login('nik', 'password', False)
if not login_status:
    del logged_user
    print(msg)
else:
    # result, msg = logged_user.add_friend('evi')
    # print(msg)
    logged_user.retrieve_friends_list()
    print(logged_user.username + '\'s friends list: ')
    for x in logged_user.friends_list:
        print(x)

# status, msg = logged_user.join_event(event_list[1])
result, msg = logged_user.retrieve_joined_events_list()
if result:
    print(msg)
    for e in logged_user.joined_events:
        print(e)
else:
    print(msg)