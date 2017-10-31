package Actions;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
public class indexAction extends ActionSupport{
      private String userName;
      private String userPass;
      public String getUserName() {
            return userName;
      }
      public void setUserName(String userName) {
            this.userName = userName;
      }
      public String getUserPass() {
            return userPass;
      }
      public void setUserPass(String userPass) {
            this.userPass = userPass;
      }
      public String execute()
      {
            ActionContext ctx=ActionContext.getContext();
            if(ctx.getSession().get("user")==null)
                  return SUCCESS;
            else
            {
                  this.userName =ctx.getSession().get("user").toString();
                  this.userPass=ctx.getSession().get("pass").toString();
                  return "success1"; 
            }
      }
}
