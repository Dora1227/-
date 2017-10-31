package Spring.impl;
import data.iFace.userFace;
import data.model.users;

import Spring.IFace.*;
public class UserService implements userServiceIFace{
	private userFace userDao;
	private String errString;
	public UserService(){}
	public int QueryUser(String userName,String userPass){
		int x;
		x=userDao.QueryUser(userName, userPass);
		if(x==-1)
			errString=userDao.getErrString();
		return x;
	}
	public userFace getUserDao() {
        return this.userDao;
    }

    public void setuserDao(userFace userDao) {
        this.userDao = userDao;
    }
    public String getErrString()
    {
    	return this.errString;
    }
}
