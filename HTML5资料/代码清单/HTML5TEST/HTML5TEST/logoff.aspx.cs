using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace HTML5TEST
{
    public partial class logoff : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Logoff_Btn_Click(object sender, EventArgs e)
        {
            Session.Clear();
            Response.Redirect("index.aspx?crossDomainFlag=logoff");
        }
    }
}