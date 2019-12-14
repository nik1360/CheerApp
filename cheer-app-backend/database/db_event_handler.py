from .db_manager import DatabaseManager


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
        self.needed_fields = self.table_events + '.name, ' + self.table_events + '.description, ' \
                             + self.table_events + '.entrance_price, ' + self.table_events + '.date, ' \
                             + self.table_venues + '.name, ' + self.table_venues + '.city, ' \
                             + self.table_venues + '.address'

    def search(self, criteria_city, criteria_date, criteria_genres):
        base_query = 'SELECT ' + self.needed_fields + ' FROM events,venues WHERE events.venue_code=venues.code'
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
        elif criteria_city and not criteria_date:  # city criteria
            self.cursor.execute(query, (self.city,))
        elif not criteria_city and criteria_date:  # date criteria
            self.cursor.execute(query, (self.date,))
        elif not criteria_city and not criteria_date:  # none of them
            self.cursor.execute(query)  # if criteria_genres = false, all the events will be showed

        result = self.cursor.fetchall()
        self.print_events(result)

    def print_events(self, result):
        print('Number of events:' + str(self.cursor.rowcount))
        print("\nEvent List")
        for row in result:
            print("Event name = ", row[0])
            print("Event description = ", row[1])
            print("Event Price  = ", row[2])
            print("Event Date  = ", row[3])
            print("Venue name  = ", row[4])
            print("Venue city  = ", row[5])
            print("Venue address  = ", row[6], "\n")
        print("---------------------------------")
