using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace API.Controllers
{
    [Route("api/Admin/{action}/{id?}")]
    public class AdminController : ApiController
    {
        string imagePath ="http://localhost/TempProject/API/Images/" ; 
        DBContext db;
        public AdminController()
        {
            db = new DBContext();
        }

        [HttpGet]
        public IHttpActionResult GetFeedback()
        {
            try
            {
                return Ok(db.feedbacks);
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }


        [HttpGet]
        public IHttpActionResult GetAdminInfo()
        {
            try
            {
                return Ok(new {
                    Email = GetSettingValueByKey("Email"),
                    FacebookURL = GetSettingValueByKey("FacebookURL"),
                    InstagramURL = GetSettingValueByKey("InstagramURL") ,
                    Phone = GetSettingValueByKey("Phone") ,
                    Address = GetSettingValueByKey("Address") ,
                });

            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult EditAdminInfo(string Email,/* string FacebookURL, string InstagramURL,*/ string Phone, string Address)
        {
            try
            {
                var a = db.Settings.Where(x => x.Key == "Email").FirstOrDefault().Value = Email;
                var b = db.Settings.Where(x => x.Key == "Phone").FirstOrDefault().Value = Phone;
                var c = db.Settings.Where(x => x.Key == "Address").FirstOrDefault().Value = Address;
                db.SaveChanges();
                return Ok(true);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }


        [HttpGet]
        public IHttpActionResult GetCollections()
        {
            try
            {
               var  filePath = HttpContext.Current.Server.MapPath("Images");
                var a = (from c in db.collections
                         from cd in db.collectionDetails.Where(x => x.CollectionID == c.ID)
                         where cd.IsMainImg == true 
                         select new
                         {
                             Id = c.ID,
                             Name = c.Name,
                             Description = c.Description,
                             Image = imagePath  + cd.ImgPath,
                         }).ToList();
                return Ok(a);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }

        [HttpPost]
        public IHttpActionResult DeleteCollection(int Id)
        {
            try
            {
                var collectionDetails =  db.collectionDetails.Where(x => x.CollectionID == Id);
                db.collectionDetails.RemoveRange(collectionDetails);
                var collection = db.collections.Where(x => x.ID == Id);
                db.collections.RemoveRange(collection);
                db.SaveChanges();
                return Ok(true);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }

        [HttpPost]
        public IHttpActionResult AddCollection(string Name , string Description)
        {
            try
            {
               //save image and collection data
                return Ok(true);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }





        private string GetSettingValueByKey(string key) {
            return db.Settings.Where(x => x.Key == key).FirstOrDefault().Value;
        }









    }
}
