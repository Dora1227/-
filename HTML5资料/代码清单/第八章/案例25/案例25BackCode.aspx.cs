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
    public partial class 案例25BackCode : System.Web.UI.Page
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
        private System.Data.SqlClient.SqlDataAdapter DataAdapter;		//SQL Data Adapter		
        private System.Data.SqlClient.SqlCommand Command;			//SQL Command
        string Constr;
        private bool SuccessFlag;
        private DataContractJsonSerializer serializerArray;
        private DataContractJsonSerializer serializer;
        private Data myData;
        protected void Page_Load(object sender, EventArgs e)
        {
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
            if (Request.QueryString["operateType"].ToString().Equals("load"))
            {
                LoadAllData();
            }
            else if (Request.QueryString["operateType"].ToString().Equals("add"))
            {
                ReadData();
                SqlStr = "select count(*) count from orders where code='" + myData.Code.Trim().Replace("'", "''") + "'";
                ds = this.GetDataFromDB(SqlStr);
                if (ds == null)
                {
                    strResult = "数据添加失败。";
                    this.WriteReturnStr(strResult);
                    return;
                }
                if (Int32.Parse(ds.Tables[0].Rows[0]["count"].ToString()) > 0)
                {
                    strResult = "输入的订单编号在数据库中已存在。";
                    this.WriteReturnStr(strResult);
                    return;
                }
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
                    strResult = "数据添加失败。";
                    this.WriteReturnStr(strResult);
                    return;
                }
                LoadAllData();
            }
            else if (Request.QueryString["operateType"].ToString().Equals("update"))
            {
                ReadData();
                SqlStr = "update orders ";
                SqlStr += "set orderDate='" + myData.Date.Trim().Replace("'", "''") + "',";
                SqlStr += "goodsCode='" + myData.GoodsCode.Trim().Replace("'", "''") + "',";
                SqlStr += "brandName='" + myData.BrandName.Trim().Replace("'", "''") + "',";
                SqlStr += "num=" + myData.Num + ",";
                SqlStr += "price=" + myData.Price+ ",";
                SqlStr += "personName='" + myData.PersonName.Trim().Replace("'", "''") + "',";
                SqlStr += "email='" + myData.Email.Trim().Replace("'", "''") + "' ";
                SqlStr += "where code='" + myData.Code.Trim().Replace("'", "''") + "'";
                SuccessFlag = this.ExecSingleSql(SqlStr);
                if (SuccessFlag == false)
                {
                    strResult = "数据修改失败。";
                    this.WriteReturnStr(strResult);
                    return;
                }
                LoadAllData();
            }
            else if (Request.QueryString["operateType"].ToString().Equals("delete"))
            {
                SqlStr = "delete from orders ";
                SqlStr += "where code='" + Request.QueryString["code"].ToString().Trim().Replace("'", "''") + "'";
                SuccessFlag = this.ExecSingleSql(SqlStr);
                if (SuccessFlag == false)
                {
                    strResult = "数据删除失败。";
                    this.WriteReturnStr(strResult);
                    return;
                }
                LoadAllData();
            }
        }
        private void LoadAllData()
        {
            String strResult = String.Empty;
            String result;
            DataSet ds;
            string SqlStr;
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
        private void ReadData()
        {
            serializer = new DataContractJsonSerializer(typeof(Data));
            Stream instream = Request.InputStream;
            byte[] buffer = new byte[instream.Length];
            instream.Read(buffer, 0, buffer.Length);
            using (MemoryStream stream = new MemoryStream(buffer))
            {
                myData = serializer.ReadObject(stream) as Data;                
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