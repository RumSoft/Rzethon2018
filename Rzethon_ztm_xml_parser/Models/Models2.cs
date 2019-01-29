using System;
using System.Collections.Generic;
using System.Text;
using System.Xml.Serialization;

namespace rzethon_ztm_xml_parser
{
    public partial class Location
    {
        [XmlElement(ElementName = "Easting")]
        public string Easting { get; set; }
        [XmlElement(ElementName = "Northing")]
        public string Northing { get; set; }
    }

    [XmlRoot(ElementName = "StopArea")]
    public class StopArea
    {
        [XmlElement(ElementName = "StopAreaCode")]
        public string StopAreaCode { get; set; }
        [XmlElement(ElementName = "Name")]
        public string Name { get; set; }
        [XmlElement(ElementName = "AdministrativeAreaRef")]
        public string AdministrativeAreaRef { get; set; }
        [XmlElement(ElementName = "StopAreaType")]
        public string StopAreaType { get; set; }
        [XmlElement(ElementName = "Location")]
        public Location Location { get; set; }
        [XmlAttribute(AttributeName = "CreationDateTime")]
        public string CreationDateTime { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    public partial class Extensions
    {
        [XmlElement(ElementName = "Direction")]
        public string Direction { get; set; }
        [XmlElement(ElementName = "DisplayDescription")]
        public string DisplayDescription { get; set; }
        [XmlElement(ElementName = "IsTechnical")]
        public string IsTechnical { get; set; }
        [XmlElement(ElementName = "IsDefault")]
        public string IsDefault { get; set; }
        [XmlElement(ElementName = "LineRef")]
        public string LineRef { get; set; }
        [XmlElement(ElementName = "OnDemandRouteSections")]
        public OnDemandRouteSections OnDemandRouteSections { get; set; }
    }

    [XmlRoot(ElementName = "Route")]
    public class Route
    {
        [XmlElement(ElementName = "Description")]
        public string Description { get; set; }
        [XmlElement(ElementName = "RouteSectionRef")]
        public List<string> RouteSectionRef { get; set; }
        [XmlElement(ElementName = "Extensions")]
        public Extensions Extensions { get; set; }
        [XmlAttribute(AttributeName = "id")]
        public string Id { get; set; }
    }

    [XmlRoot(ElementName = "OnDemandRouteSections")]
    public class OnDemandRouteSections
    {
        [XmlElement(ElementName = "OnDemandRouteSection")]
        public string OnDemandRouteSection { get; set; }
    }

    [XmlRoot(ElementName = "Routes")]
    public class Routes
    {
        [XmlElement(ElementName = "Route")]
        public List<Route> Route { get; set; }
    }

}
