using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace API.Models.Tables
{
    public class Setting
    {
        [Key]
        public int ID { get; set; }
        public string Key { get; set; }
        public string Value { get; set; }
    }
}