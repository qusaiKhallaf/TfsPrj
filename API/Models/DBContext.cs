namespace API.Models
{
    using API.Models.Tables;
    using System;
    using System.Data.Entity;
    using System.Linq;

    public class DBContext : DbContext
    {
        // Your context has been configured to use a 'DBContext' connection string from your application's 
        // configuration file (App.config or Web.config). By default, this connection string targets the 
        // 'API.Models.DBContext' database on your LocalDb instance. 
        // 
        // If you wish to target a different database and/or database provider, modify the 'DBContext' 
        // connection string in the application configuration file.
        public DBContext()
            : base("name=DBContext")
        {
        }

        // Add a DbSet for each entity type that you want to include in your model. For more information 
        // on configuring and using a Code First model, see http://go.microsoft.com/fwlink/?LinkId=390109.

        // public virtual DbSet<MyEntity> MyEntities { get; set; }


        public DbSet<Setting> Settings { get; set; }
        public DbSet<Collection> collections { get; set; }
        public DbSet<CollectionDetails> collectionDetails { get; set; }
        public DbSet<Feedback> feedbacks { get; set; }



    }

    //public class MyEntity
    //{
    //    public int Id { get; set; }
    //    public string Name { get; set; }
    //}
}