import untangle
import datetime
obj = untangle.parse("bus.xml")

#region parse data

root = obj.TransXChange

StopPoints = root.StopPoints
JourneyPatternSections = root.JourneyPatternSections
Routes = root.Routes
Lines = root.Lines
RouteSections = root.RouteSections
VehicleJourneys = root.VehicleJourneys
JourneyPatternSections = root.JourneyPatternSections
#endregion


#region find nearest bus station
def GetBusStation(lat, lng):
    lens = []
    deltas = []
    ids = []
    index = 0
    for StopPoint in StopPoints.StopPoint:
        _id = StopPoint['id']
        ind = index
        deltaLat = abs(lat - float(StopPoint.Place.Location.Latitude.cdata))
        deltaLong = abs(lng - float(StopPoint.Place.Location.Longitude.cdata))
        delta = deltaLat+deltaLong
        deltas.append(index)
        ids.append(_id)
        lens.append(delta)
        index+=1

    #find minimal value
    routeIndex = lens.index(min(lens))
    StopPointId = ids[routeIndex]

    #find stopPoint
    NearestStopPoint = None
    for StopPoint in StopPoints.StopPoint:
        if StopPoint['id']==StopPointId:
            NearestStopPoint = StopPoint

    return NearestStopPoint

#endregion

def GetBusLines(StopPointId):
    #get routes for this point
    routeSections = [] #links
    for RouteSection in RouteSections.RouteSection:
        StopPointRef = RouteSection.RouteLink.From.StopPointRef.cdata
        if StopPointRef == StopPointId:
            routeSections.append(RouteSection)
        # for JourneyPatternTimingLink in JourneyPatternSection.JourneyPatternTimingLink:
        #     JourneyPatternTimingLinkId = JourneyPatternTimingLink['id']
        #     ind = JourneyPatternTimingLink.From.StopPointRef.cdata
        #     linkRef = JourneyPatternTimingLink.RouteLinkRef.cdata
        #     if ind == StopPointId:
        #         # nearestJourneyPatternSections.append({JourneyPatternSectionId, JourneyPatternTimingLinkId, linkRef})
        #         nearestJourneyPatternSections.append({linkRef})

    #for all routes
    routes = []
    linerefs = []
    for route in Routes.Route:
        for RouteSection in route.RouteSectionRef: 
            routeSectionRef = RouteSection.cdata
            for routeSection in routeSections:
                routeSectionId = routeSection['id']
                if routeSectionRef == routeSectionId:
                    routes.append(route)
                    linerefs.append(route.Extensions.LineRef.cdata)
    
    #for all buses
    buses = []
    busesNames = []
    for line in Lines.Line:
        lineId = line['id']
        if lineId in linerefs:
            buses.append(line)
            lineName = line.LineName.cdata
            busesNames.append(lineName)
    return routes, buses, busesNames

def FindRoute(startLatitude, startLongitude, endLatitude, endLongitude):
    findedBusses = []
    findedBussesNames = []
    findedRoutes = []
    start_station = GetBusStation(startLatitude,startLongitude) #baranowka
    end_station = GetBusStation(endLatitude, endLongitude) #center

    start_busRoutes, start_busLines, startBusesNames = GetBusLines(start_station['id'])
    end_busLinesRoutes, end_busLines, endBusesNames = GetBusLines(end_station['id'])

    #find similar routes, work but idk why i've made this code, i need some sleep
    for start_busRoute in start_busRoutes:
        s_id = start_busRoute['id']
        for end_busLinesRoute in end_busLinesRoutes:
            _id = end_busLinesRoute['id']
            if s_id == _id:
                # print("Finded route!")
                findedRoutes.append(end_busLinesRoute)

    #find similar lines, doesnt work
    for start_busLine in start_busLines:
        s_id = start_busLine['id']
        for end_busLine in end_busLines:
            _id = end_busLine['id']

            if s_id == _id:
                # print("Finded line!")
                # print(start_busLine.LineName.cdata)
                findedBusses.append(start_busLine)
                findedBussesNames.append(start_busLine.LineName.cdata)

    # #findSimilar buses names
    # busName = None
    # for startBusName in startBusesNames:
    #     if startBusName in endBusesNames:
    #         busName = startBusName
    #         print(("Finded bus connection {0}!").format(startBusName))

    #find time for bus on start przystanek
    timings = []
    for VehicleJourney in VehicleJourneys.VehicleJourney:
        VehicleJourneyLineRef = VehicleJourney.LineRef.cdata
        for findedBuss in findedBusses:
            buss_id = findedBuss['id']
            if VehicleJourneyLineRef == buss_id:
                #CATCH IT!
                #check bus station equal
                journeyPatternSection = []
                for JourneyPatternSection in JourneyPatternSections.JourneyPatternSection:
                    for JourneyPatternTimingLink in JourneyPatternSection.JourneyPatternTimingLink:
                        JourneyPatternSectionStopPointRef = JourneyPatternTimingLink.From.StopPointRef.cdata
                        if JourneyPatternSectionStopPointRef == start_station['id']:
                            #CATCH IT!
                            if len(timings)>10:
                                continue
                            #get timings list with departures from now
                            time = VehicleJourney.DepartureTime.cdata
                            time = datetime.datetime.strptime(time, '%H:%M:%S')
                            timenow = datetime.datetime.now().strftime("%H:%M:%S")
                            timenow = datetime.datetime.strptime(timenow, '%H:%M:%S')
                            if timenow < time:
                                if not (time.strftime("%H:%M:%S") in timings):
                                    timings.append(time.strftime("%H:%M:%S"))
                                    # print(time)
    timings.sort()

    output ={    
        "StartStation" : {
        "name":start_station.Descriptor.CommonName.cdata,
        "Langtitude":start_station.Place.Location.Latitude.cdata,
        "Longitude":start_station.Place.Location.Longitude.cdata,
        },
        "EndStation" : {
        "name":end_station.Descriptor.CommonName.cdata,
        "Langtitude":end_station.Place.Location.Latitude.cdata,
        "Longitude":end_station.Place.Location.Longitude.cdata,
        },
        "Buses": findedBussesNames
        ,
        "Times":timings
    }

    return output

# FindRoute(startLatitude, startLongitude, endLatitude, endLongitude):
route = FindRoute(50.059543,21.977757, 50.022356, 21.985098) #baranowka => center
print(route)