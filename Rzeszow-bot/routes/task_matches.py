from flask_restful import Resource, reqparse

from models.objects import Task


task_parser = reqparse.RequestParser()
task_parser.add_argument('title', required=True)
task_parser.add_argument('description', required=True)
task_parser.add_argument('contact', required=True)
task_parser.add_argument('proposed_gain', required=True)

class TaskMatch(Resource):
    def post(self):
        args = task_parser.parse_args()
        task = Task()
        task.title = args['title']
        task.description = args['description']
        task.contact = args['contact']
        task.proposed_gain = args['proposed_gain']
        task.save()

        return 203

    def get(self):
        tasks = Task.objects.exclude('id').as_pymongo()[:10]
        task_list = []
        for task in tasks:
            task_list.append(task)
        return {"task_list": task_list}, 200






