from flask_restful import Resource, reqparse

from models.objects import Object, History

from utils import NearbyObjects

loc_parser = reqparse.RequestParser()
loc_parser.add_argument('lat', required=True)
loc_parser.add_argument('long', required=True)

class Nearby(Resource):
    def get(self):
        args = loc_parser.parse_args()
        nearby = NearbyObjects().find(args['lat'], args['long'])
        return {"nearby_objects": nearby}, 200



