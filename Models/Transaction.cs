using Microsoft.VisualBasic;

namespace Elaborate
{
    public class Transaction
    {
            public int Id { get; set; }
            public DateAndTime date { get; set; }
            public float value { get; set; }
            public string title { get; set; }
            public string comment { get; set; }
            public string category { get; set; }
        //public TransCategoryEnum category { get; set; }

        public Transaction() { }      
    }
}
