package serverTest;
import javax.servlet.http.HttpServlet;

import org.apache.log4j.Logger;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.token.Token;
import org.jwebsocket.config.*;
public class JWebSocketTokenListenerSample extends HttpServlet implements WebSocketServerTokenListener{
	private static Logger log =Logging.getLogger(JWebSocketTokenListenerSample.class);

	@Override
	public void processToken(WebSocketServerTokenEvent aEvent, Token aToken) {
		log.info("Client '" + aEvent.getSessionId() + "' sent Token: '" + aToken.toString() + "'.");
	    String lNS = aToken.getNS();
	    String lType = aToken.getType();
	    //你可以在此根据客户端发送的令牌类型返回相应的自定义的令牌
	    if (lType != null && "my.namespace".equals(lNS)) {
	      //创建一个服务器端的响应令牌
	      Token lResponse = aEvent.createResponse(aToken);
	      //如果令牌类型为getInfo,则在响应令牌中加入一些自定义消息
	      if ("getInfo".equals(lType)) {
	        lResponse.put("vendor", JWebSocketCommonConstants.VENDOR);
	        lResponse.put("copyright",JWebSocketCommonConstants.COPYRIGHT);
	        lResponse.put("license", JWebSocketCommonConstants.LICENSE);
	      } 
	      //如果令牌类型为my.namespace命名空间中的其他类型，则加入一些自定义错误信息
	      else {
	          lResponse.put("code", -1);
	          lResponse.put("msg", "令牌类型 '" + lType + "' 在'" + lNS + "'命名空间里不被支持.");
	      }
	      aEvent.sendToken(lResponse);
	    }

	}

	@Override
	public void processClosed(WebSocketServerEvent aEvent) {
		// TODO Auto-generated method stub
		log.info("Client '" + aEvent.getSessionId() + "' disconnected.");
	}

	@Override
	public void processOpened(WebSocketServerEvent aEvent) {
		// TODO Auto-generated method stub
		log.info("Client '" + aEvent.getSessionId() + "' connected.");
	}

	@Override
	public void processPacket(WebSocketServerEvent aEvent, WebSocketPacket aPacket) {
		//你可以在此处直接处理非令牌的更低阶层的数据包		
	}
	
	
}
