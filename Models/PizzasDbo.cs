using System;
using System.Collections.Generic;

#nullable disable

namespace CRUD.Models
{
    public partial class PizzasDbo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Photo { get; set; }
        public string BigPhoto { get; set; }
        public string MediumPhoto { get; set; }
        public string Ingredients { get; set; }
        public string SmallPrice { get; set; }
        public string MediumPrice { get; set; }
        public string BigPrice { get; set; }
    }
}
