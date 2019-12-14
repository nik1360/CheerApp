from database.db_event_handler import DatabaseEventFinder
from database.db_manager import DatabaseManager
from database.db_insert_handler import DatabaseInsertHandler
from registered_user import RegisteredUser

usr = RegisteredUser('nikolas1360', 'password', 'mail@mail.com', 'nikolas',
                   'Sacchi', '0000-00-00', 'Zeme', 'italian', True, True, True, False, False, False)
db = DatabaseManager()
db_search = DatabaseEventFinder("Turin", "2019-12-23", False, True, False, False, False, True)
# db_search.search(False, False, False)
db_insert = DatabaseInsertHandler()
# db_insert.insert_user(usr)

login_status, logged_user, msg = db.login('evi', 'password', False)
if not login_status:
    del logged_user
    print(msg)
else:
    result, msg = logged_user.add_friend('nik')
    print(msg)
    logged_user.retrieve_friends_list()
    print(logged_user.username + '\'s friends list: ')
    for x in logged_user.friends_list:
        print(x)


