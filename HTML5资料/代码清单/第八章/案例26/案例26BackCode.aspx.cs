using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
using System.IO;
using System.Text;

namespace HTML5TEST
{
    public partial class 案例26BackCode : System.Web.UI.Page
    {
        [DataContract]
        public class Data
        {
            [DataMember]
            public String Code { get; set; }
            [DataMember]
            public String Date { get; set; }
            [DataMember]
            public String GoodsCode { get; set; }
            [DataMember]
            public String BrandName { get; set; }
            [DataMember]
            public String Num { get; set; }
            [DataMember]
            public String Price { get; set; }
            [DataMember]
            public String PersonName { get; set; }
            [DataMember]
            public String Email { get; set; }
        }
        private System.Data.SqlClient.SqlConnection SqlCon;			//SQL Connection Object
        private System.Data.SqlClient.SqlDataAdapter DataAdapter;	//SQL Data Adapter		
        private System.Data.SqlClient.SqlCommand Command;			//SQL Command
        protected void Page_Load(object sender, EventArgs e)
        {
            string Constr, SqlStr,str;
            bool SuccessFlag;
            String strResult = String.Empty;
            Constr = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
            this.SqlCon = new System.Data.SqlClient.SqlConnection();
            this.SqlCon.ConnectionString = Constr;
            SuccessFlag = OpenDBConnection();
            if (!SuccessFlag)
            {
                strResult = "数据库连接失败";
                this.WriteReturnStr(strResult);
                return;
            }
            Stream instream = Request.InputStream;
            byte[] buffer = new byte[instream.Length];
            instream.Read(buffer, 0, buffer.Length);
            DataContractJsonSerializer serializerArray = new DataContractJsonSerializer(typeof(ArrayList));
            DataContractJsonSerializer serializer = new DataContractJsonSerializer(typeof(Data));
            using (MemoryStream stream = new MemoryStream(buffer))
            {
                ArrayList dataArray = serializerArray.ReadObject(stream) as ArrayList;
                for (int i = 0; i < dataArray.Count; i++)
                {
                    str = dataArray[i].ToString();
                    buffer = Encoding.UTF8.GetBytes(str);
                    using (MemoryStream stream1 = new MemoryStream(buffer))
                    {
                        Data myData = serializer.ReadObject(stream1) as Data;
                        SqlStr = "insert into orders ";
                        SqlStr += "values('" + myData.Code.Trim().Replace("'", "''") + "',";
                        SqlStr += "'" + myData.Date.Trim() + "',";
                        SqlStr += "'" + myData.GoodsCode.Trim().Replace("'", "''") + "',";
                        SqlStr += "'" + myData.BrandName.Trim().Replace("'", "''") + "',";
                        SqlStr += myData.Num.ToString() + ",";
                        SqlStr += myData.Price.ToString() + ",";
                        SqlStr += "'" + myData.PersonName.Trim().Replace("'", "''") + "',";
                        SqlStr += "'" + myData.Email.Trim().Replace("'", "''") + "')";
                        SuccessFlag = this.ExecSingleSql(SqlStr);
                        if (SuccessFlag == false)
                        {
                            strResult = "提交数据失败";
                            this.WriteReturnStr(strResult);
                            return;
                        }

                    }
                }
            }
            strResult = "提交数据成功";
            this.WriteReturnStr(strResult);
            return;
        }
        private bool OpenDBConnection()
        {
            try
            {
                this.SqlCon.Open();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        private bool ExecSingleSql(string SqlStr)
        {
            try
            {
                this.Command = new SqlCommand(SqlStr);
                this.Command.Connection = this.SqlCon;
                this.Command.ExecuteNonQuery();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        private void WriteReturnStr(String ReturnStr)
        {
            Response.Write(ReturnStr);
            Response.Flush();
        }
    }
}