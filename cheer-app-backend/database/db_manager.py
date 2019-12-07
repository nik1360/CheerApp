import mysql.connector
from .db_inserts import DatabaseInserts


class DatabaseManager(DatabaseInserts):
    def __init__(self):
        self.db = mysql.connector.connect(
            host='localhost',
            user='CheerApp',
            passwd='Cheer4pp',
            database='cheerapp',
            auth_plugin='mysql_native_password'
        )
        self.cursor = self.db.cursor()

    def close_connection(self):
        self.cursor.close()
