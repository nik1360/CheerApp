import sys
import mysql.connector
from mysql.connector import Error
sys.path.append('../')

from database.db_manager import DatabaseManager
from database.db_delete_handler import DatabaseDeleteHandler
from database.db_insert_handler import DatabaseInsertHandler
from database.db_checker import DatabaseChecker
from database.db_event_handler import DatabaseEventHandler

from main_entities.registered_user import RegisteredUser
from main_entities.organizer import Organizer
from main_entities.venue import Venue
from main_entities.event import Event

import unittest


# Before testing please ensure that:
# - The class DatabaseManager is pointing to the database in the localhost
# - The Database is empty

class Testevents(unittest.TestCase):

    db_insert = DatabaseInsertHandler()
    db_checker = DatabaseChecker()

    #Insert user
    status2, _ = db_insert.insert_user(RegisteredUser('pierre', 'password', 'pierre@mail.com', 'Pierre', 'SwEng', '1996-02-23', 'Pavia', 'Italian', True, True, True, False, True, False))  
    # Insert organizer
    db_insert.insert_organizer(Organizer('jack', 'password', 'jack@mail.com', 'phone', 'Jack', 'Organizer', '1996-02-23'))
    #Insert venues
    db_insert.insert_venue(Venue('Alcatraz', 'Milan', 'Viale Indipendenza 66'))
    db_insert.insert_venue(Venue('Silver', 'Pavia', 'Via Dante 78'))
    #Insert event
    db_insert.insert_event(Event('Big Party', 'description', 15, db_checker.retrieve_venue('Alcatraz', 'Milan', 'Viale Indipendenza 66'),
                             'jack', '2019-12-24', '00:00:00', '00:00:00', False, False, True, False, False, True))
    db_insert.insert_event(Event('Future Party','description', 11, db_checker.retrieve_venue('Silver', 'Pavia', 'Via Dante 78'),
                             'jack', '2020-12-31', '00:00:00', '00:00:00', False, True, True, False, False, True))

    #Insert joined event
    code = DatabaseEventHandler().retrieve_event_code('Big Party')
    db_insert.insert_users_events('pierre', code)
    code = DatabaseEventHandler().retrieve_event_code('Future Party')
    db_insert.insert_users_events('pierre', code)

def test_delete_attendance(self):
    code = DatabaseEventHandler().retrieve_event_code('Big Party')
    status, _ = DatabaseDeleteHandler().delete_attendance('pierre', code)
    self.assertTrue(status, 'the user did not attend the event')

def test_delete_attendance2(self):
    code = DatabaseEventHandler().retrieve_event_code('Future Party')
    status, _ = DatabaseDeleteHandler().delete_attendance('pierre', code)
    self.assertTrue(status, 'the user did not attend the event')


if __name__ == '__main__':
    unittest.main()