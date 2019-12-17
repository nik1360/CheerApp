from .db_manager import DatabaseManager
from .db_checker import DatabaseChecker
from event import Event

# create a list of events with the information retrieved from the query
def return_events(query_result):
    events=[]
    for row in query_result:
        e = Event(row[1], row[2], row[3], DatabaseChecker().retrieve_venue(row[15], row[16], row[17]), row[5],
                  row[6], row[7], row[8], row[9], row[10], row[11], row[12], row[13])
        e.code=row[0] # change the random code with the one retrieved from the database
        events.append(e)
    return events


# class that manages the search of events
class DatabaseEventFinder(DatabaseManager):
    def __init__(self, city, date, flag_rock, flag_hiphop, flag_reggaeton, flag_reggae, flag_techno, flag_electronic):
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
        base_query = 'SELECT * FROM events,venues WHERE events.venue_code=venues.code'
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



