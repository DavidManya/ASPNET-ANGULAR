using ASPNET_ANGULAR_PLUS.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNET_ANGULAR_PLUS.Data
{
    public class EmployeesContext : DbContext
    {
        public EmployeesContext(DbContextOptions<EmployeesContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employee { get; set; }
        public DbSet<Address> Address { get; set; }
        public object Employees { get; internal set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>().HasData(
                new Employee
                {
                    EmployeeId = 1,
                    Dni = "12345678A",
                    Name = "Elena",
                    Surnames = "Nito del Bosque",
                    Job = "Developer",
                    Email = "elenito@gmail.com",
                    Salary = 30000
                });

            modelBuilder.Entity<Address>().HasData(
            new Address
            {
                IdAddress = 1,
                StreetAddress = "Carrer Mare de Déu de les Feixes, 36",
                City = "Cerdanyola del Vallès",
                Province = "Barcelona",
                PostalCode = "08290",
                Country = "Catalunya",
                EmployeeId = 1
            });

            modelBuilder.Entity<Employee>().ToTable("Employee");
            modelBuilder.Entity<Address>().ToTable("Address");
        }
    }
}
