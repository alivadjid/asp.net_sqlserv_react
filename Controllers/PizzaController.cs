using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using CRUD.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class PizzaController : Controller
    {
        PizzaDAL obj = new PizzaDAL();

        [HttpGet]
        [Route("api/Pizza/Index")]
        public IEnumerable<PizzasDbo> Index()
        {
            return obj.GetAllItems();
        }
    }
}
