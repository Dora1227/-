package data.impl;
import java.util.Iterator;
import java.util.List;

import org.springframework.context.MessageSource;
import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

import data.iFace.*;
import org.hibernate.exception.*;
public class userImpl extends HibernateDaoSupport implements userFace{
	private String errString;
	private MessageSource messages;
	public void setMessages(MessageSource messages)
	{
		this.messages=messages;
	}
	public int QueryUser(String userName,String userPass)
	{
		try
		{
			String sql="select userPass FROM users where userName='"+userName+"'";
	        String tmpPass=null;
	        List ll = (List) this.getHibernateTemplate().find(sql);
	        Iterator itr = ll.iterator();
	        if (itr.hasNext()) {
	            Object to = itr.next();
	                tmpPass = to.toString();
	         }
			if (tmpPass==null)
				return 1;
			else if(!tmpPass.equals(userPass))
				return 2;
			else
				return 3;
		}
		catch(JDBCConnectionException ex)
		{
			this.errString=this.messages.getMessage("databaseConnectionError",new Object[]{ex.getMessage()},"dd",null);
			return -1;			
		}
		catch(Exception ex)
		{
			//this.errString="error";
			this.errString=this.messages.getMessage("databaseError",new Object[]{ex.getMessage()},"dd",null);
			return -1;
		}
	}
	public String getErrString()
	{
		return this.errString;
	}
	
}
