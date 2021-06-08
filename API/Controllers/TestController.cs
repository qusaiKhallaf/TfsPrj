using API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    [Route("api/Test/{action}/{id?}")]
    public class TestController : ApiController
    {
         DBContext context = new DBContext();
        [HttpGet]
        public IHttpActionResult testAPI()
        {
             
            return Ok(true);

        }

        [HttpGet]
        public IHttpActionResult testDB()
        {
            try
            {
                var a = context.Settings.Count();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return Ok(false);
            }

        }

    }
}
