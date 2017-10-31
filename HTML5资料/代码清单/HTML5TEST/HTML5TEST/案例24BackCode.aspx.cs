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
    public partial class 案例24BackCode : System.Web.UI.Page
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
        string Constr;
        private bool SuccessFlag;
        private DataContractJsonSerializer serializerArray;
        private DataContractJsonSerializer serializer;
        private Data myData;
        protected void Page_Load(object sender, EventArgs e)
        {
            DataContractJsonSerializer serializerArray;
            DataContractJsonSerializer serializer;
            Data myData;
            String strResult = String.Empty;
            String result;
            string SqlStr;
            DataSet ds;
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
            serializerArray = new DataContractJsonSerializer(typeof(ArrayList));
            serializer = new DataContractJsonSerializer(typeof(Data));

            SqlStr = "select * from orders order by code";
            ds = this.GetDataFromDB(SqlStr);
            if (ds == null)
            {
                strResult = "读取数据失败";
                this.WriteReturnStr(strResult);
                return;
            }
            using (MemoryStream stream = new MemoryStream())
            {
                ArrayList dataArray = new ArrayList();
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    using (MemoryStream stream1 = new MemoryStream())
                    {
                        myData = new Data();
                        myData.Code = ds.Tables[0].Rows[i]["code"].ToString();
                        myData.Date = DateTime.Parse(ds.Tables[0].Rows[i]["orderDate"].ToString()).ToString("yyyy-MM-dd");
                        myData.GoodsCode = ds.Tables[0].Rows[i]["goodsCode"].ToString();
                        myData.BrandName = ds.Tables[0].Rows[i]["brandName"].ToString();
                        myData.Num = ds.Tables[0].Rows[i]["num"].ToString();
                        myData.Price = ds.Tables[0].Rows[i]["price"].ToString();
                        myData.PersonName = ds.Tables[0].Rows[i]["personName"].ToString();
                        myData.Email = ds.Tables[0].Rows[i]["email"].ToString();
                        serializer.WriteObject(stream1, myData);
                        result = Encoding.UTF8.GetString(stream1.ToArray());
                        dataArray.Add(result);
                    }
                }
                serializerArray.WriteObject(stream, dataArray);
                result = Encoding.UTF8.GetString(stream.ToArray());
                this.WriteReturnStr(result);
            }
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
        public System.Data.DataSet GetDataFromDB(string SqlStr)
        {
            try
            {
                DataSet ds = new DataSet();
                this.DataAdapter = new SqlDataAdapter(SqlStr, this.SqlCon);
                this.DataAdapter.Fill(ds);
                return ds;
            }
            catch (Exception e)
            {
                return null;
            }
        }
        private void WriteReturnStr(String ReturnStr)
        {
            Response.Write(ReturnStr);
            Response.Flush();
        }
    }
}