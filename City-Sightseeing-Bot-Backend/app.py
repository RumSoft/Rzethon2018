from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

from routes.find import Find
from routes.nearby import Nearby
from routes.call import Call
from routes.call import Resp
from routes.task_matches import TaskMatch
from routes.questions import Question


from twilio.twiml.voice_response import VoiceResponse
from models.objects import CallQueue
@app.route("/voice", methods=['GET', 'POST'])
def voice():

    resp = VoiceResponse()
    text = CallQueue.objects(is_done=False)[0]
    text.is_done = True
    text.save()
    resp.say(text.text, voice='alice')
    # resp.record(timeout=10, transcribe=True)
    return str(resp)

# @app.route("/callback", methods=['GET', 'POST'])
# def callback():
#
#     resp = VoiceResponse()
#     text = CallQueue.objects(is_done=False)[0]
#     text.is_done = True
#     text.save()
#     resp.say(text.text, voice='alice')
#     resp.record(timeout=10, transcribe=True)
#     return str(resp)


api.add_resource(Find, '/find')
api.add_resource(Nearby, '/nearby')
api.add_resource(Call, '/call')
api.add_resource(Resp, '/resp')
api.add_resource(TaskMatch, '/task')
api.add_resource(Question, '/question')

if __name__ == '__main__':
    app.run()
