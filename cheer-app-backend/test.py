from DB_manager import DatabaseManager
from registered_user import RegisteredUser

db = DatabaseManager()
usr1 = RegisteredUser("bello2figo", "mail@m2ail", "pwd", "name", "surname", "1996-11-19", "nationality",
                      "city", "budget", False, False, False, False, False, False )

if not db.create_user(usr1):
    del usr1




