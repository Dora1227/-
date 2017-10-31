package Actions;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
import Spring.IFace.userServiceIFace;
import javax.servlet.http.HttpServletRequest;
import org.apache.struts2.ServletActionContext;
public class LoginAction extends ActionSupport{
      private static final long serialVersionUID = 1L;
      private userServiceIFace userService;
      private String userName;
      private String userPass;
      private String tip;
      private String crossDomainFlag="";
      public userServiceIFace getUserService()
      {
            return this.userService;
      }
      public void setUserService(userServiceIFace userService)
      {
            this.userService=userService;
      }
      public String getCrossDomainFlag() {
            return crossDomainFlag;
      }
      public void setCrossDomainFlag(String crossDomainFlag) {
            this.crossDomainFlag = crossDomainFlag;
      }
      public String getTip() {
            return tip;
      }
      public void setTip(String tip) {
            this.tip = tip;
      }
      public String getUserName()
      {
            return this.userName;
      }
      public void setUserName(String userName)
      {
            this.userName=userName;
      }
      public String getUserPass()
      {
            return this.userPass;
      }
      public void setUserPass(String userPass)
      {
            this.userPass=userPass;
      }
      public String execute()
      {
            int i=this.userService.QueryUser(this.userName.trim().replace("'","''"),this.userPass.trim().replace("'","''"));
            ActionContext ctx=ActionContext.getContext();
            switch(i)
            {
                case -1:
                    tip=this.userService.getErrString();
		    break;
		case 1:
                    tip="输入的用户名不正确。";
                    break;
		case 2:
                    tip="输入的密码不正确。";
                    break;
		case 3:
                    ctx.getSession().put("user",this.userName);
                    ctx.getSession().put("pass",this.userPass);
                    if(this.crossDomainFlag!=null&&(!this.crossDomainFlag.equals("")))
                    {
                        HttpServletRequest request=(HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST); 
                        request.setAttribute("crossDomainFlag",Boolean.TRUE); 
                    }
                    return "success1";       
            }		
          return SUCCESS;
      }
}
