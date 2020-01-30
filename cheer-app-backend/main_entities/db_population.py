from database.db_insert_handler import DatabaseInsertHandler
from database.db_checker import DatabaseChecker

from registered_user import RegisteredUser
from organizer import Organizer
from venue import Venue
from event import Event


db_insert = DatabaseInsertHandler()
db_checker = DatabaseChecker()

# USERS population
db_insert.insert_user(RegisteredUser('nik', 'password', 'nik@mail.com', 'Nikolas', 'SwEng', '1996-02-23', 'Pavia',
                                     'Italian', True, True, True, False, True, False))
db_insert.insert_user(RegisteredUser('evi', 'password', 'evi@mail.com', 'Evi', 'SwEng', '1996-02-23', 'Milan',
                                     'Greek', False, True, True, False, False, True))
db_insert.insert_user(RegisteredUser('julie', 'password', 'julie@mail.com', 'Julie', 'SwEng', '1996-02-23', 'Pavia',
                                     'Belgium', False, False, False, False, True, True))
db_insert.insert_user(RegisteredUser('jesus', 'password', 'jesus@mail.com', 'Jesus', 'SwEng', '1996-02-23', 'Milan',
                                     'Spanish', False, False, False, False, True, False))
db_insert.insert_user(RegisteredUser('pierre', 'password', 'pierre@mail.com', 'Pierre', 'SwEng', '1996-02-23', 'Pavia',
                                     'French', False, False, True, False, False, True))

# ORGANIZERS population
db_insert.insert_organizer(Organizer('jack', 'password', 'jack@mail.com', 'phone', 'Jack', 'Organizer', '1996-02-23'))
db_insert.insert_organizer(Organizer('ver', 'password', 'veronica@mail.com', 'phone', 'Veronica', 'Doe', '1996-02-23'))

# VENUES population
db_insert.insert_venue(Venue('Alcatraz', 'Milan', 'Viale Indipendenza 66'))
db_insert.insert_venue(Venue('Hiroshima Mon Amour', 'Turin', 'Via Dante 78'))
db_insert.insert_venue(Venue('Silver', 'Pavia', 'Via Dante 78'))
db_insert.insert_venue(Venue('Revolution', 'Mortara', 'Viale dei Mille 6'))
db_insert.insert_venue(Venue('Le Rotonde', 'Garlasco', 'Via Piave 3'))




# EVENTS population
db_insert.insert_event(Event('Big Party', 'description', 15, db_checker.retrieve_venue('Alcatraz', 'Milan', 'Viale Indipendenza 66'),
                             'jack', '2019-12-24', '00:00:00', '00:00:00', False, False, True, False, False, True))
db_insert.insert_event(Event('Christmas Party', 'description', 12, db_checker.retrieve_venue('Le Rotonde', 'Garlasco', 'Via Piave 3'),
                             'jack', '2019-12-25', '00:00:00', '00:00:00', False, True, True, False, True, True))
db_insert.insert_event(Event('New Year Party','description', 21, db_checker.retrieve_venue('Revolution', 'Mortara', 'Viale dei Mille 6'),
                             'jack', '2019-12-31', '00:00:00', '00:00:00', False, True, True, True, False, True))
db_insert.insert_event(Event('Future Party','description', 11, db_checker.retrieve_venue('Silver', 'Pavia', 'Via Dante 78'),
                             'jack', '2020-12-31', '00:00:00', '00:00:00', False, True, True, False, False, True))
db_insert.insert_event(Event('Graduation party','description', 34, db_checker.retrieve_venue('Revolution', 'Mortara', 'Viale dei Mille 6'),
                             'ver', '2020-12-31', '00:00:00', '00:00:00', False, True, True, True, False, True))
db_insert.insert_event(Event('Cool stuff','description', 21, db_checker.retrieve_venue('Alcatraz', 'Milan', 'Viale Indipendenza 66'),
                             'ver', '2020-12-31', '00:00:00', '00:00:00', False, True, True, False, False, True))
