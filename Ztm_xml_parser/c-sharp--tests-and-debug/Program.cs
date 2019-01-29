using System.IO;

namespace rzethon_ztm_xml_parser
{
    public class Program
    {
        static void Main(string[] args)
        {
            string basepath = @"C:\Users\dr124\Desktop\Marlboro_Rzeszow-Mobile";
            string filename = "txc.xml";
            string filepath = Path.Combine(basepath, filename);

            var data = (new ZtmDeserializer()).Deserialize(filepath);
        }
    }
}
