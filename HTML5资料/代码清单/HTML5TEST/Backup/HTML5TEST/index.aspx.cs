using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
namespace HTML5TEST
{
    public partial class index : System.Web.UI.Page
    {
        private System.Data.SqlClient.SqlConnection SqlCon;			//SQL Connection Object
        private System.Data.SqlClient.SqlDataAdapter DataAdapter;		//SQL Data Adapter		
        private System.Data.SqlClient.SqlCommand Command;			//SQL Command
        private int myErrorNumber = 0;
        private string myErrorMessage = "";
        private bool SuccessFlag;
        string Constr;
        public string strErrMsg;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                if (Request.QueryString["crossDomainFlag"] != null && Request.QueryString["crossDomainFlag"].ToString() == "logoff")
                    Page.ClientScript.RegisterStartupScript(Page.GetType(), "", "<script language='JavaScript'>alert('ASP.NET版HTML5测试系统成功退出');</script>");
                if(Session["UserName"]!=null)
                    Response.Redirect("Default.aspx");
            }
            else
            {
                Constr = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
                this.SqlCon = new System.Data.SqlClient.SqlConnection();
                this.SqlCon.ConnectionString = Constr;
                SuccessFlag = OpenDBConnection();
                if (SuccessFlag == false)
                {
                    this.ShowError("数据库连接失败。");
                }
            }
        }
        protected void Login_Btn_Click(object sender, EventArgs e)
        {
            string SqlStr;
            DataSet ds;
            SqlStr="select userPass from users where userName='"+this.userName.Text.Trim().Replace("'","''")+"'";
            ds = this.GetDataFromDB(SqlStr);
            if (ds == null)
            {
                this.ShowError("数据库操作失败。");
                return;
            }
            else if (ds.Tables[0].Rows.Count == 0)
            {
                this.ShowError("输入的用户名不正确。");                
                return;
            }
            else if (ds.Tables[0].Rows[0][0].ToString() != this.userPass.Text.Trim())
            {
                this.ShowError("输入的密码不正确。"); 
                return;
            }
            Session["UserName"] = this.userName.Text.Trim();
            Session["UserPass"] = this.userPass.Text.Trim();
            if (this.crossDomainFlag.Value=="true")
                Response.Redirect("Default.aspx?crossDomainFlag=" + this.crossDomainFlag.Value);
            else
                Response.Redirect("Default.aspx");
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
        public System.Data.DataSet GetDataFromDB(string SqlStr)
        {
            try
            {
                DataSet ds= new DataSet();
                this.DataAdapter = new SqlDataAdapter(SqlStr, this.SqlCon);
                this.DataAdapter.Fill(ds);
                return ds;
            }
            catch (SqlException e)
            {
                this.myErrorNumber = e.Number;
                this.myErrorMessage = e.Message;
                return null;
            }
            catch (Exception e)
            {
                this.myErrorNumber = e.GetHashCode();
                this.myErrorMessage = e.Message;
                return null;
            }
        }
        public void ShowError(string myErrorMessage)
        {
            
            if (!this.myErrorMessage.Equals(""))
                strErrMsg = this.myErrorNumber + ":" + this.myErrorMessage;
            else
                strErrMsg = myErrorMessage;
            if (this.crossDomainFlag.Value == "")
            Page.ClientScript.RegisterStartupScript(Page.GetType(), "", "<script language='JavaScript'>alert('" + strErrMsg + "');</script>");
            else
            Page.ClientScript.RegisterStartupScript(Page.GetType(), "", "<script language='JavaScript'>alert('ASP.NET版HTML5测试系统登录失败(错误:" + strErrMsg + ")');</script>");
        }



    }
}