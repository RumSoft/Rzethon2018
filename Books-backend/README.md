# Routes

### /actions/book
* get // returns all books 
```sh
{
    "success": boolean,
    "data": [
        {
            "print": string,
            "_id": string,
            "title": string,
            "desc": string,
            "author": string,
            "file": {
                "fieldname": string,
                "originalname": string,
                "encoding": string,
                "mimetype": string,
                "destination": string,
                "filename": string,
                "path": string,
                "size": number
            },
            "__v": number
        }
    ]
}
```
* post + file (name need to be bookFile) // adds book
```sh
{
	"title": string,
	"desc": string,
	"author": string,
	"print": ?string
}
```
in html file:
```sh
<form action="/actions/book" method="post" enctype="multipart/form-data">
  <input type="file" name="bookFile" />
</form>
```
* delete // removes book
```sh
{
    "id": string
}
```
* patch // edits book
```sh
{
    "id": string,
    "data": {
        // here things to change
    }
}
```
### /beacons/verify
* post // checks is user in the bus
```sh
{
    "tagName": string
}
```
### /beacons/buses
* get // all buses data
```sh
{
    "success": boolean,
    "data": [
        {
            "usersToday": number,
            "readingUsersToday": number,
            "_id": string,
            "line": string,
            "beaconsTagName": string
        }
    ]
}
```

### /reading/ebook/:id
* get // pdf file - stream

