from database.db_insert_handler import DatabaseInsertHandler
from database.db_manager import DatabaseManager

from main_entities.event import Event
from main_entities.registered_user import RegisteredUser
from main_entities.organizer import Organizer

import pytest

#Start with an empty db test

# Insert the user  --> True
def test_insert_user_1():
    user= RegisteredUser(username='username1', email='mail1@mail.com')
    op_status, _ = DatabaseInsertHandler(db_name='CheerApp_Test').insert_user(user)
    assert op_status==True

# Try to insert user in the db --> should fail because username is already registered
def test_insert_user_2():
    user = RegisteredUser(username='username1', email='mail2@mail.com')
    op_status, _ = DatabaseInsertHandler(db_name='CheerApp_Test').insert_user(user)
    assert op_status == False
# Try to insert user in the db --> should fail because email is already registered
def test_insert_user_3():
    user = RegisteredUser(username='username3', email='mail1@mail.com')
    op_status, _ = DatabaseInsertHandler(db_name='CheerApp_Test').insert_user(user)
    assert op_status == False

# Insert the organizer  --> True
def test_insert_organizer_1():
    org= Organizer(username = 'jack', email= 'organizer@mail.com', password='')
    op_status, _ = DatabaseInsertHandler(db_name='CheerApp_Test').insert_organizer(org)
    assert op_status==True

# Try to organizer in the db --> should fail because email already registered
def test_insert_organizer_2():
    org = Organizer(username='ver', email='organizer@mail.com', password='')
    op_status, _ = DatabaseInsertHandler(db_name='CheerApp_Test').insert_organizer(org)
    assert op_status == False

