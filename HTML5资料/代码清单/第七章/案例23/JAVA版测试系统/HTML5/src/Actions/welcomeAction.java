package Actions;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;

public class welcomeAction  extends ActionSupport{
	private String userName;
	private String userPass;
	private Boolean crossDomainFlag;
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

	public Boolean getCrossDomainFlag() {
		return crossDomainFlag;
	}

	public void setCrossDomainFlag(Boolean crossDomainFlag) {
		this.crossDomainFlag = crossDomainFlag;
	}

	public String execute()
	{
		ActionContext ctx=ActionContext.getContext();
		if(ctx.getSession().get("user")!=null)
		{
			this.userName =ctx.getSession().get("user").toString();
			this.userPass=ctx.getSession().get("pass").toString();
		}
		return SUCCESS;
	}
}
