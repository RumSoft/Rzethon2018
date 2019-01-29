from flask_restful import Resource, reqparse

from models.objects import Object, History
from math import sin, cos, sqrt, atan2, radians

from utils import router

finder_parser = reqparse.RequestParser()
finder_parser.add_argument('object', required=True)
finder_parser.add_argument('lat', required=True)
finder_parser.add_argument('long', required=True)

object_parser = reqparse.RequestParser()
object_parser.add_argument('name', required=True)
object_parser.add_argument('tags', required=True)
object_parser.add_argument('lat', required=True)
object_parser.add_argument('long', required=True)

class Find(Resource):
    def get(self):
        args = finder_parser.parse_args()
        key = args['object']
        obj = []
        key = key.replace(" ", "").lower()
        obj += Object.objects(__raw__={'tags': key}).as_pymongo()
        if obj == []: return 404
        max_obj = obj[0]
        max_dis = 100000000000
        for o in obj:
            if max_dis > distance(args['lat'], args['long'], o['latitude'], o['longitude']):
                max_dis = distance(args['lat'], args['long'], o['latitude'], o['longitude'])
            max_obj = o
        History().create(max_obj)
        # route = router.FindRoute(args['lat'], args['long'], max_obj['latitude'], max_obj['longitude'])
        route = router.FindRoute(float(args['lat']), float(args['long']), float(max_obj['latitude']), float(max_obj['longitude']))
        return {'name': max_obj['name'],
                'lat': max_obj['latitude'],
                'long': max_obj['longitude'],
                'bus': route
                }, 200


def distance( lat, long, obj_lat, obj_long):
    R = 6373.0
    lat1 = radians(float(lat))
    lon1 = radians(float(long))
    lat2 = radians(float(obj_lat))
    lon2 = radians(float(obj_long))

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c

    return distance

    # def post(self):
    #     args = object_parser.parse_args()
    #     obj = Object()
    #     obj.name = args['name']
    #     obj.tags = tuple(args['tags'])
    #     obj.latitude = float(args['lat'])
    #     obj.longitude = float(args['long'])
    #     obj.save()
    #     return 200




