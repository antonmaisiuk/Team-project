using System.ComponentModel.DataAnnotations;

namespace Elaborate.Models
{
    public class UpdateTransaction
    {
        public string Title { get; set; }
        public decimal Value { get; set; }
        public string Comment { get; set; }
    }
}
