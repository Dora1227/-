using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace HTML5TEST
{
    public partial class 案例23 : System.Web.UI.Page
    {
        private System.Data.SqlClient.SqlConnection SqlCon;			//SQL Connection Object
        private System.Data.SqlClient.SqlDataAdapter DataAdapter;	//SQL Data Adapter		
        private System.Data.SqlClient.SqlCommand Command;			//SQL Command
        private int myErrorNumber = 0;
        private string myErrorMessage = "";
        string Constr;
        public string Code;
        public string date;
        public string GoodsCode;
        public string brandName;
        public string num="0";
        public string price="0";
        public string money="0";
        public string PersonName;
        public string Email;
        public bool codeRead=false;
        private bool SuccessFlag;
        public bool isPostBack=false;
        public String userName;
        public String userPass;
        public bool crossDomainFlag;
        protected void Page_Load(object sender, EventArgs e)
        {          
            Constr = System.Configuration.ConfigurationManager.ConnectionStrings["dbConnection"].ToString();
            this.SqlCon = new System.Data.SqlClient.SqlConnection();
            this.SqlCon.ConnectionString = Constr;
            SuccessFlag = OpenDBConnection();
            if (Session["UserName"] != null)
            {
                userName = Session["UserName"].ToString();
                userPass = Session["UserPass"].ToString();
            }
            else
                Response.Redirect("index.aspx");
            if (Request.QueryString["crossDomainFlag"] != null && Request.QueryString["crossDomainFlag"].ToString() == "true")
                crossDomainFlag = true;
            if (SuccessFlag == false)
            {
                this.ShowError("数据库连接失败。");
            }
            else
            {
                this.datatable.DataSource = CreateDataSource();
                this.datatable.DataBind();
            }
            if (Page.IsPostBack)
            {
                this.Code = Request.Form["tbxCode"].ToString();
                this.date = Request.Form["tbxDate"].ToString();
                this.GoodsCode = Request.Form["tbxGoodsCode"].ToString();
                this.brandName = Request.Form["tbxBrandName"].ToString();
                this.num = Request.Form["tbxNum"].ToString();
                this.price = Request.Form["tbxPrice"].ToString();
                double temp = double.Parse(this.num) * double.Parse(this.price);
                this.money = Math.Round(temp, 2).ToString();
                this.PersonName = Request.Form["tbxPersonName"].ToString();
                this.Email = Request.Form["tbxEmail"].ToString();
                isPostBack = true;
            }
        }
        protected void btnNew_Click(object sender, EventArgs e)
        {
            this.Code = string.Empty;
            this.dataInit();
            this.datatable.SelectedIndex = -1;
            this.btnUpdate.Enabled = false;
            this.btnDelete.Enabled = false;
            this.btnClear.Enabled = false;
            this.btnAdd.Enabled = true;
        }
        protected void btnAdd_Click(object sender, EventArgs e)
        {
            DataSet ds;
            string SqlStr;
            SqlStr = "select count(*) count from orders where code='" + Request.Form["tbxCode"].ToString().Trim().Replace("'", "''") + "'";
            ds = this.GetDataFromDB(SqlStr);
            if (ds == null)
            {
                this.ShowError("数据添加失败。");
                return;
            }
            if (Int32.Parse(ds.Tables[0].Rows[0]["count"].ToString()) > 0)
            {
                this.ShowError("输入的订单编号在数据库中已存在。");
                return;
            }
            SqlStr = "insert into orders ";
            SqlStr += "values('" + Request.Form["tbxCode"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += "'" + Request.Form["tbxDate"].ToString() + "',";
            SqlStr += "'" + Request.Form["tbxGoodsCode"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += "'" + Request.Form["tbxBrandName"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += Request.Form["tbxNum"].ToString() + ",";
            SqlStr += Request.Form["tbxPrice"].ToString() + ",";
            SqlStr += "'" + Request.Form["tbxPersonName"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += "'" + Request.Form["tbxEmail"].ToString().Trim().Replace("'", "''") + "')";
            SuccessFlag = this.ExecSingleSql(SqlStr);
            if (SuccessFlag == false)
            {
                this.ShowError("数据添加失败。");
            }
            else
            {
                this.codeRead = true;
                this.btnUpdate.Enabled = true;
                this.btnDelete.Enabled = true;
                this.btnClear.Enabled = true;
                this.btnAdd.Enabled = false;
                this.datatable.DataSource = CreateDataSource();
                this.datatable.DataBind();
            }
        }
        protected void btnUpdate_Click(object sender, EventArgs e)
        {
            string SqlStr;
            SqlStr = "update orders ";
            SqlStr += "set orderDate='" + Request.Form["tbxDate"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += "goodsCode='" + Request.Form["tbxGoodsCode"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += "brandName='" + Request.Form["tbxBrandName"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += "num=" + Request.Form["tbxNum"].ToString() + ",";
            SqlStr += "price=" + Request.Form["tbxPrice"].ToString() + ",";
            SqlStr += "personName='" + Request.Form["tbxPersonName"].ToString().Trim().Replace("'", "''") + "',";
            SqlStr += "email='" + Request.Form["tbxEmail"].ToString().Trim().Replace("'", "''") + "' ";
            SqlStr += "where code='" + Request.Form["tbxCode"].ToString().Trim().Replace("'", "''") + "'";
            SuccessFlag = this.ExecSingleSql(SqlStr);
            if (SuccessFlag == false)
            {
                this.ShowError("数据修改失败。");
            }
            else
            {
                this.datatable.DataSource = CreateDataSource();
                this.datatable.DataBind();
                this.codeRead = true;
            }
        }
        protected void btnDelete_Click(object sender, EventArgs e)
        {
            string SqlStr;
            SqlStr = "delete from orders ";
            SqlStr += "where code='" + Request.Form["tbxCode"].ToString().Trim().Replace("'", "''") + "'";
            SuccessFlag = this.ExecSingleSql(SqlStr);
            if (SuccessFlag == false)
            {
                this.ShowError("数据删除失败。");
            }
            else
            {
                this.datatable.DataSource = CreateDataSource();
                this.datatable.DataBind();
                this.codeRead = false;
                this.datatable.SelectedIndex = -1;
                this.Code = string.Empty;
                dataInit();
                this.btnUpdate.Enabled = false;
                this.btnDelete.Enabled = false;
                this.btnClear.Enabled = false;
                this.btnAdd.Enabled = true;
            }
        }
        protected void btnClear_Click(object sender, EventArgs e)
        {
            this.codeRead = true;
            this.dataInit();
        }
        protected void datatable_ItemCommand(object source, DataGridCommandEventArgs e)
        {
            if (e.CommandName == "select")
            {
                this.Code = e.Item.Cells[0].Text;
                this.date = e.Item.Cells[1].Text;
                this.GoodsCode = e.Item.Cells[2].Text;
                if (e.Item.Cells[3].Text == "&nbsp;")
                    this.brandName = "";
                else
                    this.brandName = e.Item.Cells[3].Text;
                this.num = e.Item.Cells[4].Text;
                this.price = e.Item.Cells[5].Text;
                double temp = double.Parse(this.num) * double.Parse(this.price);
                this.money = Math.Round(temp, 2).ToString();
                if (e.Item.Cells[7].Text == "&nbsp;")
                    this.PersonName = "";
                else
                    this.PersonName = e.Item.Cells[7].Text;
                if (e.Item.Cells[8].Text == "&nbsp;")
                    this.Email = "";
                else
                    this.Email = e.Item.Cells[8].Text;
                this.codeRead = true;
                this.btnUpdate.Enabled = true;
                this.btnDelete.Enabled = true;
                this.btnClear.Enabled = true;
                this.btnAdd.Enabled = false;
            }
        }
        protected void datatable_PageIndexChanged(object source, DataGridPageChangedEventArgs e)
        {
            this.datatable.CurrentPageIndex = e.NewPageIndex;
            this.datatable.DataSource = CreateDataSource();
            this.datatable.DataBind();
        }
        private void dataInit()
        {
            this.date = string.Empty;
            this.GoodsCode = string.Empty;
            this.brandName = string.Empty;
            this.num = "0";
            this.price = "0";
            this.money = "0";
            this.PersonName = string.Empty;
            this.Email = string.Empty;
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
        public DataView CreateDataSource()
        {
            DataSet ds;
            DataView dv;
            DataTable dt = new DataTable();
            DataRow dr;
            string SqlStr;
            double temp;
            dt.Columns.Add(new DataColumn("code"));
            dt.Columns.Add(new DataColumn("orderDate"));
            dt.Columns.Add(new DataColumn("goodsCode"));
            dt.Columns.Add(new DataColumn("brandName"));
            dt.Columns.Add(new DataColumn("num"));
            dt.Columns.Add(new DataColumn("price"));
            dt.Columns.Add(new DataColumn("money"));
            dt.Columns.Add(new DataColumn("personName"));
            dt.Columns.Add(new DataColumn("email"));
            SqlStr = "select * from orders order by code";
            ds = this.GetDataFromDB(SqlStr);
            if (ds == null)
            {
                dv = null;
                dt = null;
                return dv;
            }
            for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
            {
                dr = dt.NewRow();
                dr[0] = ds.Tables[0].Rows[i]["code"].ToString();
                dr[1] = DateTime.Parse(ds.Tables[0].Rows[i]["orderDate"].ToString()).ToString("yyyy-MM-dd");
                dr[2] = ds.Tables[0].Rows[i]["goodsCode"].ToString();
                dr[3] = ds.Tables[0].Rows[i]["brandName"].ToString();
                dr[4] = ds.Tables[0].Rows[i]["num"].ToString();
                dr[5] = ds.Tables[0].Rows[i]["price"].ToString();
                temp = double.Parse(ds.Tables[0].Rows[i]["num"].ToString()) * double.Parse(ds.Tables[0].Rows[i]["price"].ToString());
                dr[6] = Math.Round(temp, 2).ToString();
                dr[7] = ds.Tables[0].Rows[i]["personName"].ToString();
                dr[8] = ds.Tables[0].Rows[i]["email"].ToString();
                dt.Rows.Add(dr);
            }
            dv = new DataView(dt);
            return dv;
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
