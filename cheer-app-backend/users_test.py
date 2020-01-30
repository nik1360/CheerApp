from database.db_manager import DatabaseManager
from database.db_checker import DatabaseChecker
from database.db_insert_handler import DatabaseInsertHandler

from registered_user import RegisteredUser
import pytest

import bcrypt


db_test=DatabaseManager(database_name='CheerApp_Test')



def test_insert_user_1():
    user= RegisteredUser('nik', None,'nik@mail.com','nikolas','sacchi','1996-11-19')
    op_status, _ = DatabaseInsertHandler(db_name='CheerApp_Test').insert_user(user)
    assert op_status==True


def test_insert_user_2():
    user = RegisteredUser('nik', None, 'nik@mail.com', 'nikolas', 'sacchi', '1996-11-19')
    op_status, _ = DatabaseInsertHandler(db_name='CheerApp_Test').insert_user(user)
    assert op_status == False