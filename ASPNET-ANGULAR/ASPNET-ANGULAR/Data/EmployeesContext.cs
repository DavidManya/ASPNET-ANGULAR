using ASPNET_ANGULAR.Models;
using Microsoft.EntityFrameworkCore;

namespace ASPNET_ANGULAR.Data
{
    public class EmployeesContext : DbContext
    {
        public EmployeesContext(DbContextOptions<EmployeesContext> options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        public DbSet<Employees> Employees { get; set; }
    }
}
