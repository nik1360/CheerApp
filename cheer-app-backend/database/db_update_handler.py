from .db_manager import DatabaseManager

class DatabaseUpdateHandler(DatabaseManager):
    def __init__(self):
        DatabaseManager.__init__(self)
        pass

    def update_avg_rating_add(self, organizer, new_rating, ):
        query = 'SELECT rating_count, sum_rating FROM ' + self.table_organizers + ' WHERE username=%s'
        self.cursor.execute(query, (organizer,))
        result = self.cursor.fetchone()
        count = result[0] + 1
        sum = result[1] + new_rating
        avg = sum/count
        query= 'UPDATE '+self.table_organizers+' SET rating_count=%s, sum_rating=%s, avg_rating=%s WHERE username=%s'
        self.cursor.execute(query, (count,sum,avg,organizer,))
        self.db.commit()

    def update_avg_rating_rem(self, organizer, user, event):
        query = 'SELECT rating FROM '+self.table_ratings+' WHERE user_username=%s AND event_code=%s'
        self.cursor.execute(query, (user,event,))
        result = self.cursor.fetchone()
        #print(result)
        rating = result[0]

        query = 'SELECT rating_count, sum_rating FROM ' + self.table_organizers + ' WHERE username=%s'
        self.cursor.execute(query, (organizer,))
        result = self.cursor.fetchone()
        count = result[0] - 1
        sum = result[1] - rating
        if(count ==0):
            avg = 0
        else:
            avg = sum / count
        query = 'UPDATE ' + self.table_organizers + ' SET rating_count=%s, sum_rating=%s, avg_rating=%s WHERE username=%s'
        self.cursor.execute(query, (count, sum, avg, organizer,))
        self.db.commit()



