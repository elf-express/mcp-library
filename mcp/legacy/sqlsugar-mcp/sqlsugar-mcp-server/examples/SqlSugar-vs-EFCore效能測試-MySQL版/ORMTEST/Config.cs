using SqlSugar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace PerformanceTest
{
    public class Config
    {
       public static  string connectionString = " server=localhost;Database=SqlSugar4xTest;Uid=root;Pwd=123456;AllowLoadLocalInfile=true";
       public static ConnectionConfig SugarConfig =new ConnectionConfig() {  IsAutoCloseConnection=true,InitKeyType = InitKeyType.Attribute, ConnectionString = Config.connectionString, DbType = DbType.MySql };
        public static SqlSugarClient GetSugarConn()
        {
            return new SqlSugarClient(SugarConfig);
        }
    }
}
