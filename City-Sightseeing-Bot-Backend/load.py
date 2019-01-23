import json
from pprint import pprint

from models import objects

with open('baza.json') as f:
    data = json.load(f)
    for x in data:
        obj = objects.Object()
        obj.latitude = x['lat']
        obj.longitude = x['long']
        obj.name = x['name']
        obj.tags = x['tags']
        obj.save()