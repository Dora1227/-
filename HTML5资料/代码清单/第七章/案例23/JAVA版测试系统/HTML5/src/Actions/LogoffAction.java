package Actions;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionSupport;
public class LogoffAction  extends ActionSupport{
        private static final long serialVersionUID = 1L;
	private String crossDomainFlag;	
	public String getCrossDomainFlag() {
		return crossDomainFlag;
	}

	public void setCrossDomainFlag(String crossDomainFlag) {
		this.crossDomainFlag = crossDomainFlag;
	}
	public String execute()
	{
		ActionContext ctx=ActionContext.getContext();
		ctx.getSession().clear();
		this.crossDomainFlag ="logoff";
		return SUCCESS;
	}
}
