package serverTest;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import org.jwebsocket.server.TokenServer;
import org.jwebsocket.factory.JWebSocketFactory;
import plugInTest.SamplePlugIn;
public class ContextListener  implements ServletContextListener{
	@Override
	public void contextInitialized(ServletContextEvent sce) {
		//启动jWebSocket服务器的子系统
		JWebSocketFactory.start();
		//获取令牌服务器
		TokenServer lServer = (TokenServer)JWebSocketFactory.getServer("ts0");
		//如果获取到令牌服务器
		if( lServer != null ) {
		  //将自定义侦听器注册到服务器的侦听器链中
		  lServer.addListener(new JWebSocketTokenListenerSample());
		  SamplePlugIn ISP=new SamplePlugIn();
		  lServer.getPlugInChain().addPlugIn(ISP);
		}
	}
	@Override
	public void contextDestroyed(ServletContextEvent sce) {
		//关闭jWebSocket服务器的子系统
		JWebSocketFactory.stop();
	}
}
