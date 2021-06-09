using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [Route("api/Admin/{action}/{id?}")]
    public class AdminController : ApiController
    {
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

    }
}
