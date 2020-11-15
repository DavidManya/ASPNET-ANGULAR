using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNET_ANGULAR_PLUS.Models
{
    public class Address
    {
        [Key]
        public int IdAddress { get; set; } = 0;

        [Required(ErrorMessage = "Direction is required")]
        public string StreetAddress { get; set; } = "";

        [Required(ErrorMessage = "City is required")]
        public string City { get; set; } = "";

        [Required(ErrorMessage = "Province is required")]
        public string Province { get; set; } = "";

        [Required(ErrorMessage = "Postal Code is required")]
        public string PostalCode { get; set; } = "";

        [Required(ErrorMessage = "Country is required")]
        public string Country { get; set; } = "";

        public int EmployeeId { get; set; }
    }
}
