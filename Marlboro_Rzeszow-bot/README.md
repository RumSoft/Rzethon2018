# City-Sightseeing-Bot-Backend
Made for Rzethon 2018 

# API DOCS


POST`/call?text=question in your favourite language `

Calls to office and ask your question
if positive code 200
----------------------------------------------
GET `/resp`

Returns answer in language you asked
```
    {
    "text": ""
    }
```
------------------------------
GET `/find?object=<tag>&lat=<latitude>&long=<longitude>`

Returns nearest object tagged with this tag
and code 200
```
    {
    "name": "",
    "lat": 1.0,
    "long": 1.0
    "bus": {
        "StartStation": {
            "name": "",
            "Langtitude": "",
            "Longitude": ""
        },
        "EndStation": {
            "name": "",
            "Langtitude": "",
            "Longitude": ""
        },
        "Buses": [],
        "Times": []
    }
    }
```


-----------------------------
POST `/task?title=<task title>&description=<task_description>&contact=<email, phone etc>&proposed_gain=<gain for person who will complete it>`
Creates new task 
Positive returns 203

----------------------------

GET `/task`
returns task list and code 200

```
        "task_list": [
        {
            "title": "",
            "contact": "",
            "proposed_gain": ""
        },
        {
            "title": "",
            "contact": "",
            "proposed_gain": ""
        },

```
-------------
GET `/question?problem=<problem keyword>`
returns solution
