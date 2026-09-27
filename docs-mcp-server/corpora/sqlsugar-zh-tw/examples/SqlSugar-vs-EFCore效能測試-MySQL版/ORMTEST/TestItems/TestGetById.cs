using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using SqlSugar;
using Microsoft.EntityFrameworkCore;

namespace PerformanceTest.TestItems
{
    public class TestGetById
    {
        public void Init(OrmType type)
        {
            Console.WriteLine("GetById");
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
                    var list = conn.Test.AsNoTracking().Where(it=>it.Id==1).ToList();
                }
            });
        }
        private void SqlSugarTest(int eachCount)
        {
            GC.Collect();//回收资源
            System.Threading.Thread.Sleep(1);//休息1秒
      
            PerHelper.Execute(eachCount, "SqlSugar", () =>
            {
                 
               var list = SqlSugarContext.Db.Queryable<Test>().Where(it => it.Id == 1).ToList();

            });
        }

    }
}
