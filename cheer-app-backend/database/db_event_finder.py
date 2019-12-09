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
        self.needed_fields =  fields = 'event.name, event.description, event.entrance_price, ' \
                'event.date, venue.name, venue.city, venue.address'


    def search_city(self, criteria):

        base_query = 'SELECT ' + self.needed_fields + ' FROM event,venue WHERE event.venue_code=venue.code AND '

        if criteria == ' CITY':
            condition = 'venue.city=%s'
            query = base_query+condition
            self.cursor.execute(query, (self.city,))
        else:
            if criteria == 'DATE':
                condition = 'event.city=%s'
                query = base_query + condition
                self.cursor.execute(query, (self.date,))
            else:
                if criteria == 'GENRES':
                    query = base_query
                    for genre, value in self.music_genres.items():
                        if value:
                            query = query + ' event.flag_' + genre + "= true OR"
                    query = query[:-2] # Remove the last OR from the query
                    print(query)
                    self.cursor.execute(query)
        result = self.cursor.fetchall()
        self.print_rows(result)

    def print_rows(self, result):
        print('Number of events:' + str(self.cursor.rowcount))
        print("\nEvent List")
        for row in result:
            print("Event name = ", row[0], )
            print("Event description = ", row[1])
            print("Event Price  = ", row[2])
            print("Event Date  = ", row[3])
            print("Venue name  = ", row[4])
            print("Venue city  = ", row[5])
            print("Venue address  = ", row[6], "\n")
        print("---------------------------------")
