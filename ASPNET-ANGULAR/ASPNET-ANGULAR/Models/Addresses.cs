using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNET_ANGULAR.Models
{
    public class Addresses
    {
        [Key]
        public int IdAddress { get; set; } = 0;

        [Required(ErrorMessage = "La dirección es obligatoria")]
        public string StreetAddress { get; set; } = "";

        [Required(ErrorMessage = "La ciudad es obligatoria")]
        public string City { get; set; } = "";

        [Required(ErrorMessage = "La provincia es obligatoria")]
        public string Province { get; set; } = "";

        [Required(ErrorMessage = "El código postal es obligatorio")]
        public string PostalCode { get; set; } = "";

        [Required(ErrorMessage = "El país es obligatorio")]
        public string Country { get; set; } = "";
    }
}
