using API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using API.Models.Tables;

namespace API.Controllers
{
    [Route("api/Visitor/{action}/{id?}")]
    public class VisitorController : ApiController
    {
        DBContext db;
        public VisitorController()
        {
            db = new DBContext();
        }


        [HttpGet]
        public IHttpActionResult GetAllCollection()
        {
            try
            {
                return Ok(db.collections);
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }

        [HttpPost]
        public IHttpActionResult SaveFeedback(Feedback feedback)
        {
            try
            {
                if (feedback != null)
                {
                    db.feedbacks.Add(feedback);
                    db.SaveChanges();
                    return Ok(true);
                }
                else
                    return Ok(false);
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }

        }


        [HttpGet]
        public IHttpActionResult GetCollectionById(int id)
        {
            try
            {
                var result = from colection in db.collectionDetails
                             where colection.CollectionID == id

                             select new
                             {
                                 ImgPath = colection.ImgPath,
                                 IsMainImg = colection.IsMainImg,
                             };

                if (result != null)
                {
                    return Ok(result);
                }
                return Ok(false);
            }
            catch (Exception ex)
            {
                return Ok(ex);

            }



        }

    }
}
