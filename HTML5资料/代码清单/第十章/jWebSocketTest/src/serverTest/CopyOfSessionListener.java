package serverTest;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import org.apache.log4j.Logger;
import org.jwebsocket.logging.Logging;
import org.jwebsocket.appserver.*;
public class CopyOfSessionListener implements HttpSessionListener {
	private static Logger mLog = null;

	private void checkLogs() {
		if (mLog == null) {
			mLog = Logging.getLogger(CopyOfSessionListener.class);
		}
	}

	@Override
	public void sessionCreated(HttpSessionEvent hse) {
		// when a new session is created by the servlet engine
		// add this session to the global WebSockethttpSessionMerger.
		WebSocketHttpSessionMerger.addHttpSession(hse.getSession());
		checkLogs();
		mLog.info("Created Http session: '" + hse.getSession().getId() + "'");
	}

	@Override
	public void sessionDestroyed(HttpSessionEvent hse) {
		// when an existing session is destroyed by the servlet engine
		// remove this session from the global WebSockethttpSessionMerger.
		WebSocketHttpSessionMerger.removeHttpSession(hse.getSession());
		checkLogs();
		mLog.info("Destroyed Http session: '" + hse.getSession().getId() + "'");
	}
}
