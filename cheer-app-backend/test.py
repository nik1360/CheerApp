from database.db_manager import DatabaseManager
from registered_user import RegisteredUser
from organizer import Organizer
from event import Event
from venue import Venue


db = DatabaseManager()
usr1 = RegisteredUser("magicmike", "mail@mail.com", "pwd", "name", "surname", "1996-11-19", "nationality",
                      "city", False, False, False, False, False, False)
org1 = Organizer("bello2figo", "mail@m2ail", "pwd", "phone", "name", "surname", "1996-11-19", "italian")
venue1 = Venue("v001", "Alcatraz", "Milan", "Via le dita dal naso")
ev1 = Event("e001", "bigParty", "description", 10.5, venue1, "2019-12-21",
            "23:00:00", "04:00:00", False, False, False, False, False, False)

if not db.insert_user(usr1):
    del usr1
else:
    print('User registered')

if not db.insert_organizer(org1):
    del org1
else:
    print('Organizer registered')

if not db.insert_event(ev1):
    del ev1
else:
    print('Event registered')




