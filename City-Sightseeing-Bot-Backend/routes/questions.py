from flask_restful import Resource, reqparse

from models.objects import Object, History

from utils import NearbyObjects

loc_parser = reqparse.RequestParser()
loc_parser.add_argument('problem', required=True)
'''
    Possible options:
    -fine
    -paying tax
    -doctor register
'''

class Question(Resource):
    def get(self):
        args = loc_parser.parse_args()
        if args['problem'] == 'fine':
            return {"solution": '''How to pay for a mandate in Poland by Internet - step by step?
Sign in to your internet banking.
In a field commitment identifier or title of the payment write a series or a number of the mandate.
Choose:
transfer to bank account number:  47 1010 0055 0201 6090 0999 0000,
SWIFT (BIC): NBPL PLPW,
IBAN: PL
Choose symbol of the form: MANDATE'''}

        # if args['problem'] == 'tax':

        if args['problem'] ==  'doctor':
            return {"solution": ""}



