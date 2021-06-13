using API.Models;
using API.Models.Tables;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
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

        [HttpPost]
        public IHttpActionResult Login(Login login) {

            try
            {
                var UserName = GetSettingValueByKey("UserName");
                var Password = GetSettingValueByKey("Password");
                if (UserName.Trim() == login.UserName.Trim() && Password.Trim() == login.Password.Trim())
                    return Ok(true);
                else
                    return Ok(false);
            }
            catch (Exception ex) {
                return Ok(false);
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
        public IHttpActionResult EditAdminInfo(AdminInfo  adminInfo)
        {
            try
            {

                var CorrectPassword = GetSettingValueByKey("Password");

                if (CorrectPassword == adminInfo.Password)
                {
                    var Email = db.Settings.Where(x => x.Key == "Email").FirstOrDefault().Value = adminInfo.Email;
                    var Phone = db.Settings.Where(x => x.Key == "Phone").FirstOrDefault().Value = adminInfo.Phone;
                    var Address = db.Settings.Where(x => x.Key == "Address").FirstOrDefault().Value = adminInfo.Address;
                    var FacebookURL = db.Settings.Where(x => x.Key == "FacebookURL").FirstOrDefault().Value = adminInfo.FacebookURL;
                    var InstagramURL = db.Settings.Where(x => x.Key == "InstagramURL").FirstOrDefault().Value = adminInfo.InstagramURL;
                    db.SaveChanges();
                    return Ok(1);

                }
                else {
                    return Ok(2);
                }
                
            }
            catch (Exception ex)
            {
                return Ok(3);
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

        [HttpPut]
        public IHttpActionResult DeleteCollection()
        {
            try
            {
                var CorrectPassword = GetSettingValueByKey("Password");
                var Password = HttpContext.Current.Request.Form["password"];
                var Id = Convert.ToInt32(HttpContext.Current.Request.Form["Id"]);

                if (CorrectPassword == Password)
                {
                    var collectionDetails = db.collectionDetails.Where(x => x.CollectionID == Id);
                    db.collectionDetails.RemoveRange(collectionDetails);
                    var collection = db.collections.Where(x => x.ID == Id);
                    db.collections.RemoveRange(collection);
                    db.SaveChanges();
                    return Ok(1);
                }
                else {
                    return Ok(2);
                }
               
            }
            catch (Exception ex)
            {
                return Ok(3);
            }
        }

        private string GetSettingValueByKey(string key)
        {
            return db.Settings.Where(x => x.Key == key).FirstOrDefault().Value;
        }


        [HttpPut]
        public IHttpActionResult AddCollection()
        {
            try
            {
                var CorrectPassword = GetSettingValueByKey("Password");
                var Password = HttpContext.Current.Request.Form["Password"];

                if (CorrectPassword == Password)
                {
                    var Name = HttpContext.Current.Request.Form["Name"];
                    var Description = HttpContext.Current.Request.Form["Description"];


                    var collection = db.collections.Add(new Collection
                    {
                        Description = Description,
                        Name = Name,
                    });
                    db.SaveChanges();
                    var result = SaveImage("~/Images/", collection.ID);
                    return Ok(result == true ? 1 : 3); // 1 :  Add Collection completed successfully
                                                       // 3 : error 
                }
                else {
                    return Ok(2); //  wrong password
                }
            
            }
            catch (Exception ex)
            {
                return Ok(3); //// 3 : error
            }

        }

        public bool SaveImage(string path , int collectionId)
        {

            try
            {

                string ExtensionPath = "";
                var httpRequest = HttpContext.Current.Request;
                string filePath = "";
                int c = 0;
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];

                    var Index = postedFile.FileName.IndexOf(".");
                    for (int i = Index; i < postedFile.FileName.Length; i++)
                    {
                        ExtensionPath = ExtensionPath + postedFile.FileName[i];
                    }
                    StreamReader csvreader = new StreamReader(postedFile.InputStream);
                    var Guids = Guid.NewGuid();
                    filePath = HttpContext.Current.Server.MapPath(path + Guids + ExtensionPath);
                   // postedFile.SaveAs(filePath);

                    db.collectionDetails.Add(new CollectionDetails
                    {
                        CollectionID = collectionId,
                        ImgPath = Guids + ExtensionPath,
                        IsMainImg = c == 0 ? true : false,
                    });
                    //c++;
                    Stream stream = httpRequest.Files[file].InputStream;
                    Stream strm = postedFile.InputStream;
                    Compressimage(strm, filePath, postedFile.FileName);
                    c++;

                }
                db.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                return false;
            }
         
        }


  

        //[HttpPost]
        //public HttpResponseMessage Post()
        //{
        //    HttpResponseMessage response = new HttpResponseMessage();
        //    var httpRequest = HttpContext.Current.Request;
        //    if (httpRequest.Files.Count > 0)
        //    {
        //        var docfiles = new List<string>();
        //        foreach (string file in httpRequest.Files)
        //        {
        //            var postedFile = httpRequest.Files[file];
        //            var filePath1 = HttpContext.Current.Server.MapPath("~/ImgFolder/" + postedFile.FileName);

        //            Stream strm = postedFile.InputStream;

        //            Compressimage(strm, filePath1, postedFile.FileName);

        //        }
        //        response = Request.CreateResponse(HttpStatusCode.Created, docfiles);
        //    }
        //    else
        //    {
        //        response = Request.CreateResponse(HttpStatusCode.BadRequest);
        //    }
        //    return response;
        //}


        public static void Compressimage(Stream sourcePath, string targetPath, String filename)
        {


            try
            {
                using (var image = Image.FromStream(sourcePath))
                {
                    float maxHeight = 600.0f;
                    float maxWidth = 600.0f;
                    int newWidth;
                    int newHeight;
                    string extension;
                    Bitmap originalBMP = new Bitmap(sourcePath);
                    int originalWidth = originalBMP.Width;
                    int originalHeight = originalBMP.Height;

                    if (originalWidth > maxWidth || originalHeight > maxHeight)
                    {

                        // To preserve the aspect ratio  
                        float ratioX = (float)maxWidth / (float)originalWidth;
                        float ratioY = (float)maxHeight / (float)originalHeight;
                        float ratio = Math.Min(ratioX, ratioY);
                        newWidth = (int)(originalWidth * ratio);
                        newHeight = (int)(originalHeight * ratio);
                    }
                    else
                    {
                        newWidth = (int)originalWidth;
                        newHeight = (int)originalHeight;

                    }
                    Bitmap bitMAP1 = new Bitmap(originalBMP, newWidth, newHeight);
                    Graphics imgGraph = Graphics.FromImage(bitMAP1);
                    extension = Path.GetExtension(targetPath);
                    if (extension == ".png" || extension == ".gif")
                    {
                        imgGraph.SmoothingMode = SmoothingMode.AntiAlias;
                        imgGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        imgGraph.DrawImage(originalBMP, 0, 0, newWidth, newHeight);


                        bitMAP1.Save(targetPath, image.RawFormat);

                        bitMAP1.Dispose();
                        imgGraph.Dispose();
                        originalBMP.Dispose();
                    }
                    else if (extension == ".jpg")
                    {

                        imgGraph.SmoothingMode = SmoothingMode.AntiAlias;
                        imgGraph.InterpolationMode = InterpolationMode.HighQualityBicubic;
                        imgGraph.DrawImage(originalBMP, 0, 0, newWidth, newHeight);
                        ImageCodecInfo jpgEncoder = GetEncoder(ImageFormat.Jpeg);
                        Encoder myEncoder = Encoder.Quality;
                        EncoderParameters myEncoderParameters = new EncoderParameters(1);
                        EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, 50L);
                        myEncoderParameters.Param[0] = myEncoderParameter;
                        bitMAP1.Save(targetPath, jpgEncoder, myEncoderParameters);

                        bitMAP1.Dispose();
                        imgGraph.Dispose();
                        originalBMP.Dispose();

                    }


                }

            }
            catch (Exception)
            {
                throw;

            }
        }


        public static ImageCodecInfo GetEncoder(ImageFormat format)
        {

            ImageCodecInfo[] codecs = ImageCodecInfo.GetImageDecoders();

            foreach (ImageCodecInfo codec in codecs)
            {
                if (codec.FormatID == format.Guid)
                {
                    return codec;
                }
            }
            return null;
        }
        


    }


    public class AdminInfo
    {
        public string Email { get; set; }
        public string FacebookURL { get; set; }
        public string InstagramURL { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
    }

    public class CollectionInfo
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Password { get; set; }
    }

    public class Login
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

}
