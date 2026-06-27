using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using SqlSugar;

namespace PerformanceTest.TestItems
{
    public class InsertDataTest 
    {
        public Guid id { get; set; }
        public long Id2 { get; set; }
    }
    public class TestInsert
    {
        public void Init(OrmType type)
        {
            SqlSugarContext.Db.CodeFirst.InitTables<InsertDataTest>();
            Console.WriteLine("Insert single");
            var eachCount = 100;
            var beginDate = DateTime.Now;
            for (int i = 0; i < 10; i++)
            {

            
                switch (type)
                {
                    case OrmType.SqlSugar:
                        SqlSugarTest(eachCount);
                        break;
                    case OrmType.EF:
                        EFTest(eachCount);
                        break;
                        break;
                    default:
                        break;
                } 
            }
            Console.WriteLine("总计：" + (DateTime.Now - beginDate).TotalMilliseconds / 1000.0);
            
        }

 
 
        private void EFTest(int eachCount)
        {
            GC.Collect();//回收资源
            System.Threading.Thread.Sleep(1);//休息1秒

            PerHelper.Execute(eachCount, "EFCore", () =>
            {
                using (EFContext conn = new EFContext())
                {
                    var list = conn.Add(new InsertDataTest() { id=Guid.NewGuid(), Id2=   SqlSugar.SnowFlakeSingle.instance.getID() });
                    conn.SaveChanges();
                }
            });
        }
        private void SqlSugarTest(int eachCount)
        {
            GC.Collect();//回收资源
            System.Threading.Thread.Sleep(1);//休息1秒
            PerHelper.Execute(eachCount, "SqlSugar", () =>
            {

               SqlSugarContext.Db.Insertable(new InsertDataTest() { id = Guid.NewGuid(), Id2 = SqlSugar.SnowFlakeSingle.instance.getID() }).ExecuteCommand();

            });
        }
    }
}
