using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace rzethon_ztm_xml_parser
{
    [XmlRoot(ElementName = "Descriptor")]
    public class Descriptor
    {
        [XmlElement(ElementName = "CommonName")]
        public string CommonName { get; set; }
        [XmlElement(ElementName = "StreetRef")]
        public string StreetRef { get; set; }
    }

    [XmlRoot(ElementName = "Location")]
    public partial class Location
    {
        [XmlElement(ElementName = "Longitude")]
        public string Longitude { get; set; }
        [XmlElement(ElementName = "Latitude")]
        public string Latitude { get; set; }
    }

    [XmlRoot(ElementName = "Place")]
    public class Place
    {
        [XmlElement(ElementName = "NptgLocalityRef")]
        public string NptgLocalityRef { get; set; }
        [XmlElement(ElementName = "Location")]
        public Location Location { get; set; }
    }

    [XmlRoot(ElementName = "Bearing")]
    public class Bearing
    {
        [XmlElement(ElementName = "CompassPoint")]
        public string CompassPoint { get; set; }
    }

    [XmlRoot(ElementName = "MarkedPoint")]
    public class MarkedPoint
    {
        [XmlElement(ElementName = "DefaultWaitTime")]
        public string DefaultWaitTime { get; set; }
        [XmlElement(ElementName = "Bearing")]
        public Bearing Bearing { get; set; }
    }

    [XmlRoot(ElementName = "Bus")]
    public class Bus
    {
        [XmlElement(ElementName = "BusStopType")]
        public string BusStopType { get; set; }
        [XmlElement(ElementName = "TimingStatus")]
        public string TimingStatus { get; set; }
        [XmlElement(ElementName = "MarkedPoint")]
        public MarkedPoint MarkedPoint { get; set; }
    }

    [XmlRoot(ElementName = "OnStreet")]
    public class OnStreet
    {
        [XmlElement(ElementName = "Bus")]
        public Bus Bus { get; set; }
    }

    [XmlRoot(ElementName = "StopClassification")]
    public class StopClassification
    {
        [XmlElement(ElementName = "StopType")]
        public string StopType { get; set; }
        [XmlElement(ElementName = "OnStreet")]
        public OnStreet OnStreet { get; set; }
    }

    [XmlRoot(ElementName = "StopAreas")]
    public partial class StopAreas
    {
        [XmlElement(ElementName = "StopAreaRef")]
        public string StopAreaRef { get; set; }
    }

    [XmlRoot(ElementName = "AdministrativeAreaRefs")]
    public class AdministrativeAreaRefs
    {
        [XmlElement(ElementName = "AdministrativeAreaRef")]
        public List<string> AdministrativeAreaRef { get; set; }
    }

    [XmlRoot(ElementName = "Extensions")]
    public partial class Extensions
    {
        [XmlElement(ElementName = "PublicCode")]
        public string PublicCode { get; set; }
        [XmlElement(ElementName = "OnDemand")]
        public string OnDemand { get; set; }
        [XmlElement(ElementName = "IsHome")]
        public string IsHome { get; set; }
        [XmlElement(ElementName = "StopRadius")]
        public string StopRadius { get; set; }
        [XmlElement(ElementName = "AdministrativeAreaRefs")]
        public AdministrativeAreaRefs AdministrativeAreaRefs { get; set; }
    }

    [XmlRoot(ElementName = "StopPoint")]
    public class StopPoint
    {
        [XmlElement(ElementName = "AtcoCode")]
        public string AtcoCode { get; set; }
        [XmlElement(ElementName = "Descriptor")]
        public Descriptor Descriptor { get; set; }
        [XmlElement(ElementName = "Place")]
        public Place Place { get; set; }
        [XmlElement(ElementName = "StopClassification")]
        public StopClassification StopClassification { get; set; }
        [XmlElement(ElementName = "StopAreas")]
        public StopAreas StopAreas { get; set; }
        [XmlElement(ElementName = "AdministrativeAreaRef")]
        public string AdministrativeAreaRef { get; set; }
        [XmlElement(ElementName = "Extensions")]
        public Extensions Extensions { get; set; }
        [XmlAttribute(AttributeName = "CreationDateTime")]
        public string CreationDateTime { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "StopPoints")]
    public class StopPoints
    {
        [XmlElement(ElementName = "StopPoint")]
        public List<StopPoint> StopPoint { get; set; }
    }


    [XmlRoot(ElementName = "From")]
    public partial class From
    {
        [XmlElement(ElementName = "Activity")]
        public string Activity { get; set; }
        [XmlElement(ElementName = "StopPointRef")]
        public string StopPointRef { get; set; }
        [XmlElement(ElementName = "TimingStatus")]
        public string TimingStatus { get; set; }
    }

    [XmlRoot(ElementName = "To")]
    public partial class To
    {
        [XmlElement(ElementName = "StopPointRef")]
        public string StopPointRef { get; set; }
        [XmlElement(ElementName = "TimingStatus")]
        public string TimingStatus { get; set; }
        [XmlElement(ElementName = "Activity")]
        public string Activity { get; set; }
    }

    [XmlRoot(ElementName = "JourneyPatternTimingLink")]
    public class JourneyPatternTimingLink
    {
        [XmlElement(ElementName = "From")]
        public From From { get; set; }
        [XmlElement(ElementName = "To")]
        public To To { get; set; }
        [XmlElement(ElementName = "RouteLinkRef")]
        public string RouteLinkRef { get; set; }
        [XmlElement(ElementName = "Direction")]
        public string Direction { get; set; }
        [XmlElement(ElementName = "RunTime")]
        public string RunTime { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "JourneyPatternSection")]
    public class JourneyPatternSection
    {
        [XmlElement(ElementName = "JourneyPatternTimingLink")]
        public List<JourneyPatternTimingLink> JourneyPatternTimingLink { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "JourneyPatternSections")]
    public class JourneyPatternSections
    {
        [XmlElement(ElementName = "JourneyPatternSection")]
        public List<JourneyPatternSection> JourneyPatternSection { get; set; }
    }
}
