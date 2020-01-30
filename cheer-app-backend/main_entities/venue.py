import random
import string


class Venue:
    def __init__(self, name, city, address):
        self.code = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
        self.name = name
        self.city = city
        self.address = address
