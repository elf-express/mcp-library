using Microsoft.EntityFrameworkCore;
using PerformanceTest.TestItems;
using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace PerformanceTest
{
    public class Test
    {
      
        [SqlSugar.SugarColumn(IsIdentity =true ,IsPrimaryKey =true)]
        public int Id { get; set; }
        public byte? F_Byte { get; set; }
        public Int16? F_Int16 { get; set; }
        public int? F_Int32 { get; set; }
        public long? F_Int64 { get; set; }
        public double? F_Double { get; set; }
        //public float? F_Float { get; set; }
        //public decimal? F_Decimal { get; set; }
        public bool? F_Bool { get; set; }
        public DateTime? F_DateTime { get; set; }
        public Guid? F_Guid { get; set; }
        public string F_String { get; set; }
    }
    
 
    public class SqlSugarContext 
    {
        public static SqlSugarClient Db =  new SqlSugarClient(new ConnectionConfig()
        {
            DbType = SqlSugar.DbType.MySql,
            ConnectionString = Config.connectionString,
            IsAutoCloseConnection = true
        } );
    }
    public class EFContext : DbContext
    {
        public DbSet<Test > Test  { get; set; }
        public DbSet<InsertDataTest> InsertDataTest { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            options.UseMySql(Config.connectionString, ServerVersion.AutoDetect(Config.connectionString), null);

        }
    }
}
