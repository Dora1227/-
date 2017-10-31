package plugInTest;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javolution.util.FastList;
import javolution.util.FastMap;
import org.apache.log4j.Logger;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.config.JWebSocketServerConstants;
import org.jwebsocket.kit.CloseReason;
import org.jwebsocket.kit.PlugInResponse;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.plugins.TokenPlugIn;
import org.jwebsocket.token.Token;
public class SamplePlugIn extends TokenPlugIn{
    private static Logger log=Logging.getLogger(SamplePlugIn.class);
    private static String NS_SAMPLE = JWebSocketServerConstants.NS_BASE + ".plugins.samples";
    private static String SAMPLE_VAR=NS_SAMPLE+".started";
    public SamplePlugIn()
    {
    	if(log.isDebugEnabled())
    		log.debug("Instantiating sample plug-in...");
    	//指定示例插件的命名空间
    	this.setNamespace(NS_SAMPLE);
    }
    @Override
    public void connectorStarted(WebSocketConnector aConnector)
    {
    	//当客户端与服务器端建立连接时将调用这个方法
    	aConnector.setVar(SAMPLE_VAR, new Date().toString());
    }
    @Override
    public void connectorStopped(WebSocketConnector aConnector, CloseReason aCloseReason) {
    	//当客户端与服务器端的连接被关闭时将调用这个方法
    }
    @Override
    public void engineStarted(WebSocketEngine aEngine){
    	super.engineStarted(aEngine);
    }
    @Override
    public void engineStopped(WebSocketEngine aEngine){
    	super.engineStopped(aEngine);
    } 
    @Override
    public void processToken(PlugInResponse aRespone,WebSocketConnector aConnector,Token aToken){
    	//获取令牌类型
    	//类型可以被理解为一个“命令”
    	String lType=aToken.getType();
    	//获取令牌命名空间
    	//每个插件都有自己的唯一命名空间
    	String lNS=aToken.getNS();
    	//检查令牌是否拥有类型与一个匹配的命名空间
    	if(lType!=null&&lNS!=null&&lNS.equals(getNamespace())){
    		//获取服务器上的系统时间
    		if(lType.equals("requestServerTime")){
    			//创建响应令牌
    			//响应令牌中包括唯一的令牌id
    			Token lResponse=createResponse(aToken);
                //添加time字段与started字段
    			lResponse.put("time",new Date().toString());
    			lResponse.put("started",aConnector.getVar(SAMPLE_VAR));
    			//向客户端发送响应令牌
    			sendToken(aConnector,aConnector,lResponse);
    		}
    	}
    }
}
