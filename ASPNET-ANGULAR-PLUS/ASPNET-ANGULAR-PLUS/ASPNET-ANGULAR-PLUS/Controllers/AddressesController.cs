using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using ASPNET_ANGULAR_PLUS.Data;
using ASPNET_ANGULAR_PLUS.Models;

namespace ASPNET_ANGULAR_PLUS.Controllers
{
    [Produces("application/json")]
    [Route("api/addresses")]
    public class AddressesController : Controller
    {
        private readonly EmployeesContext dbContext;

        public AddressesController(EmployeesContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpPost("delete/list")]
        public IActionResult DeleteList([FromBody] List<int> ids)
        {
            try
            {
                List<Address> addresses = ids.Select(id => new Address() { IdAddress = id }).ToList();
                dbContext.RemoveRange(addresses);
                dbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok();
        }
    }
}
