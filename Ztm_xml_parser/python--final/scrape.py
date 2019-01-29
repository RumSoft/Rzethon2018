import json
#data scrapper from guugle
import googlemaps
from datetime import datetime
import urllib

key = "AIzaSyChDIQ986RH8rKcyeOdcY64pBzHk5JUwdI"

tags = "Automobile_repair_shop,Arcade,Bakery,Bank,Bookstore,Car_wash,Convenience_store,Filling_station,Beauty_salon.Hairdresser.Hobby_shop,Market,Market_house,Wet_market,Pharmacy,Shopping_mall,Supermarket,Hypermarket,Department_store,Bar,Pub,Internet_cafe,Eatery,Fast-food,Restaurant,Pizzeria,Convention_center,Forum,Hotel,Mountain_hut,Office,Car_dealership,Columbarium,Swimming_pool,Sports_hall,Playspace,Arena,Library,Museum,Theater,Church,City_hall,Consulate,Courthouse,Embassy,Fire_station,Meeting_house,Parliament_house,Police_station,Post_office,Brewery,Factory,Foundry,Winery,Distillery,Mill,Refinery,Warehouse,Workshop,Arsenal,Barracks,Bunker,Blockhouse,Citadel,Parking,Airport_terminal,Bus_station,Metro_station,Taxi_station,Railway_station,Bridge,Amusement_park,Gym,Sports_club"
tags = tags.split(",")

#Grabbing and parsing the JSON data
def GoogPlac(lat,lng,radius,types,_key):
    #making the url
    AUTH_KEY = _key
    LOCATION = str(lat) + "," + str(lng)
    RADIUS = radius
    TYPES = types
    MyUrl = ('https://maps.googleapis.com/maps/api/place/nearbysearch/json'
            '?location=%s'
            '&radius=%s'
            '&types=%s'
            '&sensor=false&key=%s') % (LOCATION, RADIUS, TYPES, AUTH_KEY)
    #grabbing the JSON result
    import urllib.request
    with urllib.request.urlopen(MyUrl) as url:
        s = url.read()
        # response = urllib.urlopen(MyUrl)
        jsonRaw = s #response.read()
        jsonData = json.loads(jsonRaw)
        return jsonData

def Append(tagName, radius):
    import time
    time.sleep(1)
    places = GoogPlac(50.036226, 22.003785, radius, tagName, key)

    f = open("baza.json", "a")

    places_json_output ="r_r"

    # convert into JSON:
    places_json = str(json.dumps(places["results"]))
    # places_json = places_json[1:]
    # places_json = places_json[:(len(places_json)-1)]
    places_json_output+=places_json
    
    f.write(places_json_output)
    print(("{0} data appended").format(tagName))

for tag in tags:
    Append(tag,6000)
