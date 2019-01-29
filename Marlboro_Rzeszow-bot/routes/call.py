from flask_restful import Resource, reqparse

from models.objects import Object, History, CallQueue, ResponsQueue

from utils.call import make_call
from utils.translate import translate_text_to_eng, detect_lang, translate_text

text_parser = reqparse.RequestParser()
text_parser.add_argument('text', required=True)

class Call(Resource):
    def post(self):
        args = text_parser.parse_args()
        call = CallQueue()
        call.original_lang = detect_lang(args['text'])
        call.text = translate_text_to_eng(args['text'])
        call.save()
        make_call()
        return 200

class Resp(Resource):
    def post(self):
        args = text_parser.parse_args()
        obj = CallQueue.objects(is_resp=False)[0]
        obj.is_resp = True
        obj.save()
        resp = ResponsQueue()
        resp.text = args['text']
        resp.original_lang = obj.original_lang
        resp.save()
        return 200

    def get(self):
        resp = ResponsQueue.objects(is_readed=False)[0]
        resp.is_readed = True
        resp.save()
        resp.text = translate_text(resp.original_lang, resp.text)
        return {'text': resp.text}, 200




