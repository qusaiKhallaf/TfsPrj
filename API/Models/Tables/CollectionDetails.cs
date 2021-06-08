using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace API.Models.Tables
{
    public class CollectionDetails
    {
        [Key]
        public int ID { get; set; }
        public string ImgPath { get; set; }
        public bool IsMainImg { get; set; }

        public int? CollectionID { get; set; }
        [ForeignKey("CollectionID")]
        public virtual Collection Collections { get; set; }

    }
}