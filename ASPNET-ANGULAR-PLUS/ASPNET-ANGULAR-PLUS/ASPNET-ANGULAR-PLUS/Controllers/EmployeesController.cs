using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using ASPNET_ANGULAR_PLUS.Data;
using ASPNET_ANGULAR_PLUS.Models;
using System.Security.Cryptography.X509Certificates;

namespace ASPNET_ANGULAR_PLUS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : Controller
    {
        private readonly EmployeesContext _context;

        public EmployeesController(EmployeesContext context)
        {
            _context = context;
        }

        // GET: api/Employees
        [HttpGet]
        public IEnumerable<Employee> GetEmployees()
        {
            return _context.Employee;
        }

        // GET: api/Employees/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployees([FromRoute] int id, bool includeDirections = false)
        {
            Employee employee;

            if (includeDirections)
            {
                employee = await _context.Employee.Include(x => x.Addresses).SingleOrDefaultAsync(m => m.EmployeeId == id);
            }
            else
            {
                //employee = await _context.Employee.SingleOrDefaultAsync(m => m.EmployeeId == id);
                employee = await _context.Employee.FindAsync(id);
            }

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }

        private async Task CreateOrEditAddresses(List<Address> addresses)
        {
            List<Address> addressesToCreate = addresses.Where(x => x.EmployeeId == 0).ToList();
            List<Address> addressesToEdit = addresses.Where(x => x.EmployeeId != 0).ToList();

            if (addressesToCreate.Any())
            {
                await _context.AddRangeAsync(addressesToCreate);
            }

            if (addressesToEdit.Any())
            {
                _context.UpdateRange(addressesToEdit);
            }
        }

        // PUT: api/Employees/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployees([FromRoute] int id, [FromBody] Employee employee)
        {
            if (id != employee.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await CreateOrEditAddresses(employee.Addresses);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Employees
        [HttpPost]
        public async Task<IActionResult> PostEmployees([FromBody] Employee employee)
        {
            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployees", new { id = employee.EmployeeId }, employee);
        }

        // DELETE: api/Employees/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Employee>> DeleteEmployees(int id)
        {
            var employee = await _context.Employee.SingleOrDefaultAsync(m => m.EmployeeId == id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.EmployeeId == id);
        }
    }
}
