import sys

sys.path.append('../')
from database.db_insert_handler import DatabaseInsertHandler
from database.db_manager import DatabaseManager
from database.db_delete_handler import DatabaseDeleteHandler

from main_entities.event import Event
from main_entities.registered_user import RegisteredUser
from main_entities.organizer import Organizer

import unittest

# Before testing please ensure that:
# - The class DatabaseManager is pointing to the database in the localhost
# - The Database is empty

class Testfriends(unittest.TestCase):
    db_insert = DatabaseInsertHandler()
    status1, _ = db_insert.insert_user(RegisteredUser('nik', 'password', 'nik@mail.com', 'Nikolas', 'SwEng', '1996-02-23', 'Pavia', 'Italian', True, True, True, False, True, False))
    status2, _ = db_insert.insert_user(RegisteredUser('pierre', 'password', 'pierre@mail.com', 'Pierre',
                                                         'SwEng', '1996-02-23', 'Pavia', 'Italian', True, True, True,
                                                         False, True, False))  

    status, _ = db_insert.insert_friends('nik','pierre')

    def test_delete_friends(self):
        status =  DatabaseDeleteHandler().delete_friend('nik','pierre')
        self.assertTrue(status,'the users were not friends')

    def test_delete_friends2(self):
        status =  DatabaseDeleteHandler().delete_friend('nik','pierre')
        self.assertFalse(status,'the users were friends')

if __name__ == '__main__':
    unittest.main()