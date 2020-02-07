import sys
sys.path.append('../')
from database.db_insert_handler import DatabaseInsertHandler
from database.db_manager import DatabaseManager
from database.db_checker import DatabaseChecker
from database.db_event_handler import DatabaseEventHandler

from main_entities.event import Event
from main_entities.registered_user import RegisteredUser
from main_entities.organizer import Organizer
from main_entities.venue import Venue

import unittest

# Before testing please ensure that:
# - The class DatabaseManager is pointing to the database in the localhost
# - The Database is empty

class Test (unittest.TestCase):
    # insert user
    def test_insert_user1(self):  
        status,_ = DatabaseInsertHandler().insert_user(RegisteredUser('nik', 'password', 'nik@mail.com', 'Nikolas', 
        'SwEng', '1996-02-23', 'Pavia','Italian', True, True, True, False, True, False))
        self.assertTrue(status)
    # try to insert same user
    def test_insert_user2(self):
        status,_ = DatabaseInsertHandler().insert_user(RegisteredUser('nik', 'password', 'nik@mail.com', 'Nikolas', 
        'SwEng', '1996-02-23', 'Pavia','Italian', True, True, True, False, True, False))
        self.assertFalse(status)
    # try user same mail different username
    def test_insert_user3(self):
        status,_ = DatabaseInsertHandler().insert_user(RegisteredUser('john', 'password', 'nik@mail.com', 'Nikolas', 
        'SwEng', '1996-02-23', 'Pavia','Italian', True, True, True, False, True, False))
        self.assertFalse(status)
    # try user same username different mail
    def test_insert_user4(self):
        status,_ = DatabaseInsertHandler().insert_user(RegisteredUser('nik', 'password', 'john@mail.com', 'Nikolas', 
        'SwEng', '1996-02-23', 'Pavia','Italian', True, True, True, False, True, False))
        self.assertFalse(status)

    # insert organizer
    def test_insert_organizer1(self):  
        status,_ = DatabaseInsertHandler().insert_organizer(Organizer('jack', 'password', 'jack@mail.com', 
        'phone', 'Jack', 'Organizer', '1996-02-23'))
        self.assertTrue(status)
    # try to insert same organizer
    def test_insert_organizer2(self):
        status,_ = DatabaseInsertHandler().insert_organizer(Organizer('jack', 'password', 'jack@mail.com', 
        'phone', 'Jack', 'Organizer', '1996-02-23'))
        self.assertFalse(status)
    # try organizer same mail different username
    def test_insert_organizer3(self):
        status,_ = DatabaseInsertHandler().insert_organizer(Organizer('tom', 'password', 'jack@mail.com', 
        'phone', 'Jack', 'Organizer', '1996-02-23'))
        self.assertFalse(status)
    # try organizer same username different mail
    def test_insert_organizer4(self):
        status,_ = DatabaseInsertHandler().insert_organizer(Organizer('jack', 'password', 'tom@mail.com', 
        'phone', 'Jack', 'Organizer', '1996-02-23'))
        self.assertFalse(status)
    
    # insert venue
    def test_insert_venue1(self):
        status,_ = DatabaseInsertHandler().insert_venue(Venue('Alcatraz', 'Milan', 'Viale Indipendenza 66'))
        self.assertTrue(status)
    # try same venue
    def test_insert_venue2(self):
        status,_ = DatabaseInsertHandler().insert_venue(Venue('Alcatraz', 'Milan', 'Viale Indipendenza 66'))
        self.assertFalse(status)
    # try venue with different name
    def test_insert_venue3(self):
        status,_ = DatabaseInsertHandler().insert_venue(Venue('TheClub', 'Milan', 'Viale Indipendenza 66'))
        self.assertTrue(status)

    # insert event
    def test_insert_event1(self):
        DatabaseInsertHandler().insert_organizer(Organizer('ver', 'password', 'veronica@mail.com', 'phone', 
        'Veronica', 'Doe', '1996-02-23'))
        DatabaseInsertHandler().insert_venue(Venue('Revolution', 'Mortara', 'Viale dei Mille 6'))
        status,_ = DatabaseInsertHandler().insert_event(Event('Graduation party','description', 34, 
        DatabaseChecker().retrieve_venue('Revolution', 'Mortara', 'Viale dei Mille 6'),'ver', '2020-12-31', 
        '00:00:00', '00:00:00', False, True, True, True, False, True))
        self.assertTrue(status)
    # try same event
    def test_insert_event2(self):
        DatabaseInsertHandler().insert_organizer(Organizer('ver', 'password', 'veronica@mail.com', 'phone', 
        'Veronica', 'Doe', '1996-02-23'))
        DatabaseInsertHandler().insert_venue(Venue('Revolution', 'Mortara', 'Viale dei Mille 6'))
        status,_ = DatabaseInsertHandler().insert_event(Event('Graduation party','description', 34, 
        DatabaseChecker().retrieve_venue('Revolution', 'Mortara', 'Viale dei Mille 6'),'ver', '2020-12-31', 
        '00:00:00', '00:00:00', False, True, True, True, False, True))
        self.assertFalse(status)
    # try other event for same venue same date
    def test_insert_event3(self):
        DatabaseInsertHandler().insert_organizer(Organizer('ver', 'password', 'veronica@mail.com', 'phone', 
        'Veronica', 'Doe', '1996-02-23'))
        DatabaseInsertHandler().insert_venue(Venue('Revolution', 'Mortara', 'Viale dei Mille 6'))
        status,_ = DatabaseInsertHandler().insert_event(Event('Reggaeton party','description', 24, 
        DatabaseChecker().retrieve_venue('Revolution', 'Mortara', 'Viale dei Mille 6'),'ver', '2020-12-31', 
        '00:00:00', '00:00:00', False, False, True, True, False, True))
        self.assertFalse(status)

    # insert friends
    def test_insert_friends1(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('julie', 'password', 'julie@mail.com', 'Julie', 
        'SwEng', '1996-02-23', 'Pavia', 'Belgium', False, False, False, False, True, True))
        DatabaseInsertHandler().insert_user(RegisteredUser('evi', 'password', 'evi@mail.com', 'Evi', 
        'SwEng', '1996-02-23', 'Milan', 'Greek', False, True, True, False, False, True))
        status,_ = DatabaseInsertHandler().insert_friends('julie','evi')
        self.assertTrue(status)
    # try friends already friends
    def test_insert_friends2(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('julie', 'password', 'julie@mail.com', 'Julie', 
        'SwEng', '1996-02-23', 'Pavia', 'Belgium', False, False, False, False, True, True))
        DatabaseInsertHandler().insert_user(RegisteredUser('evi', 'password', 'evi@mail.com', 'Evi', 
        'SwEng', '1996-02-23', 'Milan', 'Greek', False, True, True, False, False, True))
        status,_ = DatabaseInsertHandler().insert_friends('julie','evi')
        self.assertFalse(status)
    # try to add friend itself
    def test_insert_friends3(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('julie', 'password', 'julie@mail.com', 'Julie', 
        'SwEng', '1996-02-23', 'Pavia', 'Belgium', False, False, False, False, True, True))
        status,_ = DatabaseInsertHandler().insert_friends('julie','julie')
        self.assertFalse(status)
    
    # insert user event
    def test_insert_user_events1(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('jesus', 'password', 'jesus@mail.com', 'Jesus', 
        'SwEng', '1996-02-23', 'Milan', 'Spanish', False, False, False, False, True, False))
        DatabaseInsertHandler().insert_venue(Venue('Silver', 'Pavia', 'Via Dante 78'))
        DatabaseInsertHandler().insert_event(Event('Future Party','description', 11, 
        DatabaseChecker().retrieve_venue('Silver', 'Pavia', 'Via Dante 78'), 'jack', '2020-12-31', 
        '00:00:00', '00:00:00', False, True, True, False, False, True))
        event_code = DatabaseEventHandler().retrieve_event_code('Future Party')
        status,_ = DatabaseInsertHandler().insert_users_events('jesus', event_code)
        self.assertTrue(status)
    # try same user for same event
    def test_insert_user_events2(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('jesus', 'password', 'jesus@mail.com', 'Jesus', 
        'SwEng', '1996-02-23', 'Milan', 'Spanish', False, False, False, False, True, False))
        DatabaseInsertHandler().insert_venue(Venue('Silver', 'Pavia', 'Via Dante 78'))
        DatabaseInsertHandler().insert_event(Event('Future Party','description', 11, 
        DatabaseChecker().retrieve_venue('Silver', 'Pavia', 'Via Dante 78'), 'jack', '2020-12-31', 
        '00:00:00', '00:00:00', False, True, True, False, False, True))
        event_code = DatabaseEventHandler().retrieve_event_code('Future Party')
        status,_ = DatabaseInsertHandler().insert_users_events('jesus', event_code)
        self.assertFalse(status)
    
    # insert rating
    def test_insert_rating1(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('pierre', 'password', 'pierre@mail.com', 'Pierre', 
        'SwEng', '1996-02-23', 'Pavia','French', False, False, True, False, False, True))
        DatabaseInsertHandler().insert_organizer(Organizer('will', 'password', 'will@mail.com', 'phone', 
        'Will', 'Smith', '1990-04-23'))
        DatabaseInsertHandler().insert_venue(Venue('Easy Club', 'Pavia', 'Corso Garibaldi 7'))
        DatabaseInsertHandler().insert_event(Event('Inhuman Party','description', 15, 
        DatabaseChecker().retrieve_venue('Easy Club', 'Pavia', 'Corso Garibaldi 7'), 'will', '2020-08-17', 
        '00:00:00', '00:00:00', False, True, True, False, False, True))
        event_code = DatabaseEventHandler().retrieve_event_code('Inhuman Party')
        status,_ = DatabaseInsertHandler().insert_rating('pierre', 'will', event_code, 4.0)
        self.assertTrue(status)
    # try same rating
    def test_insert_rating2(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('pierre', 'password', 'pierre@mail.com', 'Pierre', 
        'SwEng', '1996-02-23', 'Pavia','French', False, False, True, False, False, True))
        DatabaseInsertHandler().insert_organizer(Organizer('will', 'password', 'will@mail.com', 'phone', 
        'Will', 'Smith', '1990-04-23'))
        DatabaseInsertHandler().insert_venue(Venue('Easy Club', 'Pavia', 'Corso Garibaldi 7'))
        DatabaseInsertHandler().insert_event(Event('Inhuman Party','description', 15, 
        DatabaseChecker().retrieve_venue('Easy Club', 'Pavia', 'Corso Garibaldi 7'), 'will', '2020-08-17', 
        '00:00:00', '00:00:00', False, True, True, False, False, True))
        event_code = DatabaseEventHandler().retrieve_event_code('Inhuman Party')
        status,_ = DatabaseInsertHandler().insert_rating('pierre', 'will', event_code, 4.0)
        self.assertFalse(status)
    # insert invitation
    def test_insert_invitation1(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('andrea', 'password', 'andrea@mail.com', 'Andrea', 
        'SwEng', '1998-02-23', 'Pavia','Italian', False, False, True, False, False, True))
        DatabaseInsertHandler().insert_user(RegisteredUser('alessandro', 'password', 'alex@mail.com', 'Alessandro', 
        'SwEng', '1999-05-23', 'Pavia','Italian', False, False, True, False, False, False))
        DatabaseInsertHandler().insert_organizer(Organizer('jonny', 'password', 'jonny@mail.com', 'phone', 
        'Jonny', 'Smith', '1985-07-23'))
        DatabaseInsertHandler().insert_venue(Venue('Raise', 'Pavia', 'Strada Nuova 5'))
        DatabaseInsertHandler().insert_event(Event('Chill Party','description', 5, 
        DatabaseChecker().retrieve_venue('Raise', 'Pavia', 'Strada Nuova 5'), 'jonny', '2020-08-17', 
        '00:00:00', '00:00:00', False, True, False, False, False, True))
        event_code = DatabaseEventHandler().retrieve_event_code('Chill Party')
        status,_ = DatabaseInsertHandler().insert_invitation('andrea','alessandro',event_code,'Chill Party')
        self.assertTrue(status)
    # try to invite the same user for the same event
    def test_insert_invitation2(self):
        DatabaseInsertHandler().insert_user(RegisteredUser('andrea', 'password', 'andrea@mail.com', 'Andrea', 
        'SwEng', '1998-02-23', 'Pavia','Italian', False, False, True, False, False, True))
        DatabaseInsertHandler().insert_user(RegisteredUser('alessandro', 'password', 'alex@mail.com', 'Alessandro', 
        'SwEng', '1999-05-23', 'Pavia','Italian', False, False, True, False, False, False))
        DatabaseInsertHandler().insert_organizer(Organizer('jonny', 'password', 'jonny@mail.com', 'phone', 
        'Jonny', 'Smith', '1985-07-23'))
        DatabaseInsertHandler().insert_venue(Venue('Raise', 'Pavia', 'Strada Nuova 5'))
        DatabaseInsertHandler().insert_event(Event('Chill Party','description', 5, 
        DatabaseChecker().retrieve_venue('Raise', 'Pavia', 'Strada Nuova 5'), 'jonny', '2020-08-17', 
        '00:00:00', '00:00:00', False, True, False, False, False, True))
        event_code = DatabaseEventHandler().retrieve_event_code('Chill Party')
        status,_ = DatabaseInsertHandler().insert_invitation('andrea','alessandro',event_code,'Chill Party')
        self.assertFalse(status)
        

if __name__ == '__main__':
    unittest.main()    