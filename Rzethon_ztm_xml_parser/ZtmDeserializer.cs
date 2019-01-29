using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Xml;
using System.Xml.Serialization;

namespace rzethon_ztm_xml_parser
{
    public class TransXChange
    {
        public List<JourneyPatternSection> JourneyPatternSections { get; set; }
        public List<StopPoint> StopPoints { get; set; }
        public List<StopArea> StopAreas { get; set; }
        //public List<> RouteSections { get; set; }
        public List<Route> Routes { get; set; }
        public List<Service> Services { get; set; }
        //public List<VehicleJourney> VehicleJourneys { get; set; }
        public List<Line> Lines { get; set; }
        // public List<Garage> Garages { get; set; }
        public Extensions Extensions { get; set; }
    }

    public class ZtmDeserializer
    {
        public object Deserialize(string path)
        {
            var xroot = new XmlRootAttribute
            {
                ElementName = "TransXChange",
                IsNullable = true,
                DataType = typeof(TransXChange).ToString(),
                Namespace = "http://www.transxchange.org.uk/"
            };

            var serializer = new XmlSerializer(typeof(TransXChange), xroot);
            using (var reader = new XmlTextReader(path))
            {
                var data = (TransXChange)serializer.Deserialize(reader);
                if (data == null)
                    throw new SerializationException(path);
            }

            return null;
        }
    }
}