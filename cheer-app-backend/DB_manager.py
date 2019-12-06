import mysql.connector


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
        self.query_result=[]

    def check_username(self, username, email, table_name):
        query = 'SELECT * FROM USER WHERE %s = %s OR EMAIL = %s'
        self.cursor.execute(query, (table_name, username, email))
        self.query_result = self.cursor.fetchall()

    def create_user(self, user):
        # Check if the mail or the username have been already registered
        self.check_username(user.username, user.email, "USER")
        if not self.query_result:
            query = 'insert into user values(%s,%s,%s,%s,%s,%s, %s, %s, %s, %s ,%s ,%s, %s, %s) '
            self.cursor.execute(query, (user.username, user.password, user.email, user.name, user.surname,
                                        user.date_of_birth, user.city, user.nationality, user.music_tastes["rock"],
                                        user.music_tastes["hiphop"], user.music_tastes["reggaeton"], user.music_tastes["reggae"],
                                        user.music_tastes["techno"], user.music_tastes["electroinc"], ))
            self.db.commit()
            return True
        else:
            print("Username or email already taken")
            return False

    def close_connection(self):
        self.cursor.close()
