using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD.Models
{
    public class PizzaDAL
    {
        Pizza_DbContext db = new Pizza_DbContext();

        //this method will get all the record
        public IEnumerable<PizzasDbo> GetAllItems()
        {
            return db.PizzasDbos.ToList();
        }
    }
}
