using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Json;
namespace HTML5TEST
{
    public partial class 案例21: System.Web.UI.Page
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
            public int Num { get; set; }
            [DataMember]
            public float Price { get; set; }
            [DataMember]
            public String PersonName { get; set; }
            [DataMember]
            public String Email { get; set; }
        }
        private System.Data.SqlClient.SqlConnection SqlCon;		//SQL Connection Object
        private System.Data.SqlClient.SqlDataAdapter DataAdapter;	//SQL Data Adapter		
        private System.Data.SqlClient.SqlCommand Command;		//SQL Command
        private System.Data.DataSet Dataset;			        //SQL Data Set
        private int myErrorNumber = 0;
        private string myErrorMessage = "";
        public bool postFlag = false;
        protected void Page_Load(object sender, EventArgs e)
        {
            string Constr,SqlStr;
            bool SuccessFlag;
            if (Page.IsPostBack)
            {
                Constr = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
                this.SqlCon = new System.Data.SqlClient.SqlConnection();
                this.SqlCon.ConnectionString = Constr;
                SuccessFlag = OpenDBConnection();
                if (SuccessFlag == false)
                {
                    this.ShowError("数据库连接失败。");
                    return;
                }
                String str = Request.Form["JSONText"].ToString();
                byte[] buffer = Encoding.UTF8.GetBytes(str);
                DataContractJsonSerializer serializerArray=new DataContractJsonSerializer(typeof(ArrayList));
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
                            SqlStr += "values('" + myData.Code.Trim().Replace("'","''")+"',";
                            SqlStr += "'" + myData.Date.Trim() + "',";
                            SqlStr += "'" + myData.GoodsCode.Trim().Replace("'", "''") + "',";
                            SqlStr += "'" + myData.BrandName.Trim().Replace("'", "''") + "',";
                            SqlStr += myData.Num.ToString()+ ",";
                            SqlStr += myData.Price.ToString() + ",";
                            SqlStr += "'" + myData.PersonName.Trim().Replace("'", "''") + "',";
                            SqlStr += "'" + myData.Email.Trim().Replace("'", "''") + "')";
                            SuccessFlag = this.ExecSingleSql(SqlStr);
                            if (SuccessFlag == false)
                            {
                                this.ShowError("数据添加失败。");
                                return;
                            }
                            postFlag = true;
                        }
                    }
                }
            }
        }
        private bool OpenDBConnection()
        {
            try
            {
                this.SqlCon.Open();
                return true;
            }
            catch (SqlException e)
            {
                this.myErrorNumber = e.Number;
                this.myErrorMessage = e.Message;
                return false;
            }
            catch (Exception e)
            {
                this.myErrorNumber = e.GetHashCode();
                this.myErrorMessage = e.Message;
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
            catch (SqlException e)
            {
                this.myErrorNumber = e.Number;
                this.myErrorMessage = e.Message;
                return false;
            }
            catch (Exception e)
            {
                this.myErrorNumber = e.GetHashCode();
                this.myErrorMessage = e.Message;
                return false;
            }
        }
        public void ShowError(string myErrorMessage)
        {
            string strErrMsg;
            if (!this.myErrorMessage.Equals(""))
                strErrMsg = this.myErrorNumber + ":" + this.myErrorMessage;
            else
                strErrMsg = myErrorMessage;
            Page.ClientScript.RegisterStartupScript(Page.GetType(), "", "<script language='JavaScript'>alert('" + strErrMsg + "');</script>");
        }
    }
}