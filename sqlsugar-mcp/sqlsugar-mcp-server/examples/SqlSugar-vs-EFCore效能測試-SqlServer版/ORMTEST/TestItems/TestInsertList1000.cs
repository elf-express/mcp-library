using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using SqlSugar;

namespace PerformanceTest.TestItems
{
 
    public class TestInsertList1000
    {
        public void Init(OrmType type)
        {
            SqlSugarContext.Db.CodeFirst.InitTables<InsertDataTest>();
            Console.WriteLine("InsertRange 1000");
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
                        break;;
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
                     conn.InsertDataTest.AddRange(GetList());
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

               SqlSugarContext.Db.Insertable(GetList()).UseParameter().ExecuteCommand();

            });
        }

   
        private static List<InsertDataTest> GetList()
        {
            List<InsertDataTest> result = new List<InsertDataTest>();
            for (int i = 0; i < 1000; i++)
            {
                result.Add(new InsertDataTest() { id = Guid.NewGuid(), Id2 = SqlSugar.SnowFlakeSingle.instance.getID() });
            }
            return result;
        }

    }
}
