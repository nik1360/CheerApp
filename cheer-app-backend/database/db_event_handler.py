from .db_manager import DatabaseManager
from .db_checker import DatabaseChecker

from event import Event
from organizer import Organizer

# create a list of events with the information retrieved from the query
def return_events(query_result):
    events = []
    for row in query_result:
        e = Event(row[1], row[2], row[3], DatabaseChecker().retrieve_venue(row[16], row[17], row[18]), row[5],
                  str(row[6]), str(row[7]), str(row[8]), row[9], row[10], row[11], row[12], row[13], row[14])
        e.code = row[0]  # change the random code with the one retrieved from the database
        events.append(e)
    return events


# class that manages everything related to events
class DatabaseEventHandler(DatabaseManager):
    def __init__(self, city='', date='',
                 flag_rock=False, flag_hiphop=False, flag_reggaeton=False, flag_reggae=False,
                 flag_techno=False, flag_electronic=False):
        DatabaseManager.__init__(self)
        self.city = city
        self.date = date
        self.music_genres = {
            "rock": flag_rock,
            "hiphop": flag_hiphop,
            "reggaeton": flag_reggaeton,
            "reggae": flag_reggae,
            "techno": flag_techno,
            "electronic": flag_electronic
        }

    # search the events that respect some criteria (CITY, DATE, GENRES)
    def search(self, criteria_city, criteria_date, criteria_genres):
        base_query = 'SELECT * FROM ' + self.table_events + ','+ self.table_venues+' WHERE ' + \
                     self.table_events + '.venue_code=' + self.table_venues + '.code'
        query = base_query
        # Construction of the query basing on the search criteria
        if criteria_city:
            condition = self.table_venues + '.city=%s'
            query = query + ' AND ' + condition
        if criteria_date:
            condition = self.table_events + '.date=%s'
            query = query + ' AND ' + condition
        if criteria_genres:
            query = query + ' AND ('
            for genre, value in self.music_genres.items():
                if value:
                    query = query + self.table_events + '.flag_' + genre + "=true OR "
            query = query[:-4] + ')'  # Remove the last OR (and 2 spaces) from the query
        # Only city and date criteria require parameters, so only them will be tested
        if criteria_city and criteria_date:  # both criteria
            self.cursor.execute(query, (self.city, self.date))
        elif criteria_city and not criteria_date:  # city criteria selected
            self.cursor.execute(query, (self.city,))
        elif not criteria_city and criteria_date:  # date criteria selected
            self.cursor.execute(query, (self.date,))
        elif not criteria_city and not criteria_date:  # neither city or date criteria
            self.cursor.execute(query)  # if criteria_genres = false, all the events will be showed

        result = self.cursor.fetchall()
        events = return_events(result)
        return events

    def retrieve_event_by_code(self,event_code):
        base_query = 'SELECT * FROM ' + self.table_events + ',' + self.table_venues + ' WHERE (' + \
                     self.table_events + '.venue_code=' + self.table_venues + '.code) AND (' + \
                     self.table_events + '.code=%s)'
        query = base_query

        self.cursor.execute(query, (event_code,))
        r = self.cursor.fetchall()

        if r is None:
            return False, None, 'The event does not exists'
        else:
            e = return_events(r)
            return True, e, 'Event retrieved correctly'

    # method that takes from the database the events that a user joined
    def retrieve_joined_events(self, user):
        query = 'SELECT event_code FROM ' + self.table_users_events + ' WHERE username=%s'
        self.cursor.execute(query, (user.username,))
        result1 = self.cursor.fetchall()
        if not result1:
            return False, user.username+' haven\'t joined any event yet!'
        else:
            condition = ' WHERE (' + self.table_events + '.venue_code=' + self.table_venues + '.code AND ' \
                        + self.table_events + '.code=%s)'
            query = 'SELECT * FROM ' + self.table_events + ',' + self.table_venues + condition
            for row in result1:
                self.cursor.execute(query, (row[0],))
                result2 = self.cursor.fetchall()
                for e in return_events(result2):
                    user.joined_events.append(e)
            return True, 'Joined events list retrieved successfully!'


    def retrieve_organized_events(self, organizer):
        condition = self.table_events + '.venue_code=' + self.table_venues + '.code AND ' + \
                    self.table_events + '.organizer_username=%s'
        query = 'SELECT * FROM '+self.table_events+','+self.table_venues+' WHERE '+ condition
        self.cursor.execute(query, (organizer.username,))
        result = self.cursor.fetchall()
        if not result:
            return False, 'No event organized by ' + organizer.username
        else:
            for e in return_events(result):
                organizer.organized_events.append(e)
            return True, 'Events organized by ' + organizer.username + 'retrieved correctly!'

    def retrieve_organizer_details(self, username):
        query='SELECT * FROM '+ self.table_organizers + ' WHERE username=%s'
        self.cursor.execute(query, (username,))
        res = self.cursor.fetchone()
        if not res:
            return False, None, 'No organizer with username ' + username
        else:
            org = Organizer(res[0], res[1], res[2], res[3], res[4], res[5], str(res[6]) )

            return True, org, 'Details of organizer ' + username + 'retrieved correctly!'


