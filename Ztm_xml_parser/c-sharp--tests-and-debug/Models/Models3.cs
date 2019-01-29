using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace rzethon_ztm_xml_parser
{
    [XmlRoot(ElementName = "Line")]
    public class Line
    {
        [XmlElement(ElementName = "LineName")]
        public string LineName { get; set; }
        [XmlElement(ElementName = "LineColour")]
        public string LineColour { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "Lines")]
    public class Lines
    {
        [XmlElement(ElementName = "Line")]
        public List<Line> Line { get; set; }
    }

    [XmlRoot(ElementName = "OperatingPeriod")]
    public class OperatingPeriod
    {
        [XmlElement(ElementName = "StartDate")]
        public string StartDate { get; set; }
        [XmlElement(ElementName = "EndDate")]
        public string EndDate { get; set; }
    }

    [XmlRoot(ElementName = "DateRange")]
    public class DateRange
    {
        [XmlElement(ElementName = "StartDate")]
        public string StartDate { get; set; }
        [XmlElement(ElementName = "EndDate")]
        public string EndDate { get; set; }
    }

    [XmlRoot(ElementName = "DaysOfNonOperation")]
    public class DaysOfNonOperation
    {
        [XmlElement(ElementName = "DateRange")]
        public List<DateRange> DateRange { get; set; }
    }

    [XmlRoot(ElementName = "DaysOfWeek")]
    public class DaysOfWeek
    {
        [XmlElement(ElementName = "MondayToFriday")]
        public string MondayToFriday { get; set; }
        [XmlElement(ElementName = "Sunday")]
        public string Sunday { get; set; }
        [XmlElement(ElementName = "Saturday")]
        public string Saturday { get; set; }
        [XmlElement(ElementName = "Monday")]
        public string Monday { get; set; }
        [XmlElement(ElementName = "Tuesday")]
        public string Tuesday { get; set; }
        [XmlElement(ElementName = "Wednesday")]
        public string Wednesday { get; set; }
        [XmlElement(ElementName = "Thursday")]
        public string Thursday { get; set; }
        [XmlElement(ElementName = "Friday")]
        public string Friday { get; set; }
    }

    [XmlRoot(ElementName = "RegularDayType")]
    public class RegularDayType
    {
        [XmlElement(ElementName = "DaysOfWeek")]
        public DaysOfWeek DaysOfWeek { get; set; }
    }

    [XmlRoot(ElementName = "OperatingProfile")]
    public class OperatingProfile
    {
        [XmlElement(ElementName = "DaysOfNonOperation")]
        public DaysOfNonOperation DaysOfNonOperation { get; set; }
        [XmlElement(ElementName = "RegularDayType")]
        public RegularDayType RegularDayType { get; set; }
    }

    [XmlRoot(ElementName = "JourneyPattern")]
    public class JourneyPattern
    {
        [XmlElement(ElementName = "Direction")]
        public string Direction { get; set; }
        [XmlElement(ElementName = "RouteRef")]
        public string RouteRef { get; set; }
        [XmlElement(ElementName = "JourneyPatternSectionRef")]
        public string JourneyPatternSectionRef { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "StandardService")]
    public class StandardService
    {
        [XmlElement(ElementName = "Origin")]
        public string Origin { get; set; }
        [XmlElement(ElementName = "Destination")]
        public string Destination { get; set; }
        [XmlElement(ElementName = "UseAllStopPoints")]
        public string UseAllStopPoints { get; set; }
        [XmlElement(ElementName = "JourneyPattern")]
        public List<JourneyPattern> JourneyPattern { get; set; }
    }

    [XmlRoot(ElementName = "DayTypes")]
    public class DayTypes
    {
        [XmlElement(ElementName = "DayTypeRef")]
        public string DayTypeRef { get; set; }
    }




    public partial class Location
    {
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "Interval")]
    public class Interval
    {
        [XmlElement(ElementName = "ScheduledFrequency")]
        public string ScheduledFrequency { get; set; }
    }

    [XmlRoot(ElementName = "Frequency")]
    public class Frequency
    {
        [XmlElement(ElementName = "EndTime")]
        public string EndTime { get; set; }
        [XmlElement(ElementName = "Interval")]
        public Interval Interval { get; set; }
        [XmlElement(ElementName = "FrequentService")]
        public string FrequentService { get; set; }
    }


    public partial class From
    {
 
        [XmlElement(ElementName = "DynamicDestinationDisplay")]
        public string DynamicDestinationDisplay { get; set; }
        [XmlElement(ElementName = "DutyShiftNameAfterDivide")]
        public string DutyShiftNameAfterDivide { get; set; }
    }


    public partial class To
    {
        [XmlElement(ElementName = "DynamicDestinationDisplay")]
        public string DynamicDestinationDisplay { get; set; }

    }

    [XmlRoot(ElementName = "VehicleJourneyTimingLink")]
    public class VehicleJourneyTimingLink
    {
        [XmlElement(ElementName = "JourneyPatternTimingLinkRef")]
        public string JourneyPatternTimingLinkRef { get; set; }
        [XmlElement(ElementName = "RunTime")]
        public string RunTime { get; set; }
        [XmlElement(ElementName = "From")]
        public From From { get; set; }
        [XmlElement(ElementName = "To")]
        public To To { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "VehicleJourneyStopPoint")]
    public class VehicleJourneyStopPoint
    {
        [XmlElement(ElementName = "Sequence")]
        public string Sequence { get; set; }
        [XmlElement(ElementName = "StopPointRef")]
        public string StopPointRef { get; set; }
        [XmlElement(ElementName = "Legends")]
        public Legends Legends { get; set; }
    }

    public partial class StopAreas
    {
        [XmlElement(ElementName = "StopArea")]
        public List<StopArea> StopArea { get; set; }
    }

    [XmlRoot(ElementName = "VehicleJourneyStopPoints")]
    public class VehicleJourneyStopPoints
    {
        [XmlElement(ElementName = "VehicleJourneyStopPoint")]
        public List<VehicleJourneyStopPoint> VehicleJourneyStopPoint { get; set; }
    }

    public partial class Extensions
    {
        [XmlElement(ElementName = "VehicleJourneyKind")]
        public string VehicleJourneyKind { get; set; }
        [XmlElement(ElementName = "SequenceOnBrigade")]
        public string SequenceOnBrigade { get; set; }
        [XmlElement(ElementName = "VehicleJourneyStopPoints")]
        public VehicleJourneyStopPoints VehicleJourneyStopPoints { get; set; }
    }

    [XmlRoot(ElementName = "VehicleJourney")]
    public class VehicleJourney
    {
        [XmlElement(ElementName = "VehicleJourneyCode")]
        public string VehicleJourneyCode { get; set; }
        [XmlElement(ElementName = "ServiceRef")]
        public string ServiceRef { get; set; }
        [XmlElement(ElementName = "LineRef")]
        public string LineRef { get; set; }
        [XmlElement(ElementName = "JourneyPatternRef")]
        public string JourneyPatternRef { get; set; }
        [XmlElement(ElementName = "DepartureTime")]
        public string DepartureTime { get; set; }
        [XmlElement(ElementName = "Frequency")]
        public Frequency Frequency { get; set; }
        [XmlElement(ElementName = "VehicleJourneyTimingLink")]
        public List<VehicleJourneyTimingLink> VehicleJourneyTimingLink { get; set; }
        [XmlElement(ElementName = "Extensions")]
        public Extensions Extensions { get; set; }
        [XmlAttribute(AttributeName = "ModificationDateTime")]
        public string ModificationDateTime { get; set; }
    }

    public  class Legends
    {
        [XmlElement(ElementName = "LegendID")]
        public string LegendID { get; set; }
    }

    [XmlRoot(ElementName = "VehicleJourneys")]
    public class VehicleJourneys
    {
        [XmlElement(ElementName = "VehicleJourney")]
        public List<VehicleJourney> VehicleJourney { get; set; }
    }

    [XmlRoot(ElementName = "Mapping")]
    public class Mapping
    {
        [XmlElement(ElementName = "Location")]
        public List<Location> Location { get; set; }
    }

    [XmlRoot(ElementName = "Track")]
    public class Track
    {
        [XmlElement(ElementName = "Mapping")]
        public Mapping Mapping { get; set; }
    }

    [XmlRoot(ElementName = "RouteLink")]
    public class RouteLink
    {
        [XmlElement(ElementName = "From")]
        public From From { get; set; }
        [XmlElement(ElementName = "To")]
        public To To { get; set; }
        [XmlElement(ElementName = "Distance")]
        public string Distance { get; set; }
        [XmlElement(ElementName = "Track")]
        public List<Track> Track { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
        [XmlAttribute(AttributeName = "ModificationDateTime")]
        public string ModificationDateTime { get; set; }
    }

    [XmlRoot(ElementName = "RouteSection")]
    public class RouteSection
    {
        [XmlElement(ElementName = "RouteLink")]
        public RouteLink RouteLink { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "RouteSections")]
    public class RouteSections
    {
        [XmlElement(ElementName = "RouteSection")]
        public List<RouteSection> RouteSection { get; set; }
    }

    public partial class Extensions
    {
        [XmlElement(ElementName = "Number")]
        public string Number { get; set; }
        [XmlElement(ElementName = "MainLineID")]
        public string MainLineID { get; set; }
        [XmlElement(ElementName = "FleetTypeID")]
        public string FleetTypeID { get; set; }
        [XmlElement(ElementName = "HomeID")]
        public string HomeID { get; set; }
        [XmlElement(ElementName = "StartTime")]
        public string StartTime { get; set; }
        [XmlElement(ElementName = "DayTypes")]
        public DayTypes DayTypes { get; set; }
        [XmlElement(ElementName = "Legends")]
        public Legends Legends { get; set; }
    }

    [XmlRoot(ElementName = "Service")]
    public class Service
    {
        [XmlElement(ElementName = "ServiceCode")]
        public string ServiceCode { get; set; }
        [XmlElement(ElementName = "PrivateCode")]
        public string PrivateCode { get; set; }
        [XmlElement(ElementName = "Lines")]
        public Lines Lines { get; set; }
        [XmlElement(ElementName = "OperatingPeriod")]
        public OperatingPeriod OperatingPeriod { get; set; }
        [XmlElement(ElementName = "OperatingProfile")]
        public OperatingProfile OperatingProfile { get; set; }
        [XmlElement(ElementName = "RegisteredOperatorRef")]
        public string RegisteredOperatorRef { get; set; }
        [XmlElement(ElementName = "Description")]
        public string Description { get; set; }
        [XmlElement(ElementName = "StandardService")]
        public StandardService StandardService { get; set; }
        [XmlElement(ElementName = "Extensions")]
        public Extensions Extensions { get; set; }
        [XmlAttribute(AttributeName = "ModificationDateTime")]
        public string ModificationDateTime { get; set; }
    }

 

    [XmlRoot(ElementName = "Services")]
    public class Services
    {
        [XmlElement(ElementName = "Service")]
        public List<Service> Service { get; set; }
    }
}
