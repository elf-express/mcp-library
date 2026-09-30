using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using SqlSugar;
using Microsoft.EntityFrameworkCore;

namespace PerformanceTest.TestItems
{
    public class TestGetByPage
    {
        public void Init(OrmType type)
        {
            Console.WriteLine("GetByPage");
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
                    var list = conn.Test.AsNoTracking().Skip(10).Take(10).ToList();
                }
            });
        }
        private void SqlSugarTest(int eachCount)
        {
            GC.Collect();//回收资源
            System.Threading.Thread.Sleep(1);//休息1秒
            var db = SqlSugarContext.Db ;
            PerHelper.Execute(eachCount, "SqlSugar", () =>
            {

                var list = db.Queryable<Test>().Skip(10).Take(10).ToList();

            });
        }
    }
}
