import mysql.connector


# Base class that allow the interaction with the mySQL database
class DatabaseManager:
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
