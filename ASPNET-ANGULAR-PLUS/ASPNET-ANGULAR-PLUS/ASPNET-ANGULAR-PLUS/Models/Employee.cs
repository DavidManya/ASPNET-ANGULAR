using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ASPNET_ANGULAR_PLUS.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; } = 0;

        [Required(ErrorMessage = "DNI is required")]
        [MinLength(9, ErrorMessage = "The DNI must be at least 9 characters long")]
        public string Dni { get; set; } = "";

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; } = "";

        [Required(ErrorMessage = "Surnames are required")]
        public string Surnames { get; set; } = "";

        [Required(ErrorMessage = "You must report the job")]
        public string Job { get; set; } = "";

        [Required(ErrorMessage = "You must report an email")]
        [EmailAddress(ErrorMessage = "You must report a valid email")]
        public string Email { get; set; } = "";

        [Required(ErrorMessage = "You must report an salary")]
        //[RegularExpression("/^[0-9]+$/", ErrorMessage = "El valor ha de ser numérico")]
        public int Salary { get; set; } = 0;

        public List<Address> Addresses { get; set; }
    }
}
