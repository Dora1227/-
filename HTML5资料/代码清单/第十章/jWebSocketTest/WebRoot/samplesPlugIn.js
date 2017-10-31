jws.SamplesPlugIn = {
	// 设置插件的命名空间
	//如果需要修改这个命名空间，请同时修改服务器端插件的命名空间!
	NS: jws.NS_BASE + ".plugins.samples",

	processToken: function( aToken ) {
		//检查命名空间是否匹配
		if( aToken.ns == jws.SamplesPlugIn.NS ) {
			//如果有必要的话，可以直接处理接收到的服务器端的响应令牌中的数据
			if( "requestServerTime" == aToken.reqType ) {
				// 此处功能仅作演示用途
				// 请不要执行诸如alert等会阻塞通信的函数!
				// 例如 alert( "jWebSocket Server returned: " + aToken.time );
				if( this.OnSamplesServerTime ) {
					this.OnSamplesServerTime( aToken );
				}
			}
		}
	},
	requestServerTime: function( aOptions ) {
		var lRes = this.createDefaultResult();
		if( this.isConnected() ) {
			var lToken = {
				ns: jws.SamplesPlugIn.NS,
				type: "requestServerTime"
			};
			this.sendToken( lToken,	aOptions );
		} else {
			lRes.code = -1;
			lRes.localeKey = "jws.jsc.res.notConnected";
			lRes.msg = "客户端与服务器端之间的连接未建立.";
		}
		return lRes;
	},
	setSamplesCallbacks: function( aListeners ) {
		if( !aListeners ) {
			aListeners = {};
		}
		if( aListeners.OnSamplesServerTime !== undefined ) {
			this.OnSamplesServerTime = aListeners.OnSamplesServerTime;
		}
	}
}

//在TokenClient类中添加共享的插件对象
jws.oop.addPlugIn( jws.jWebSocketTokenClient, jws.SamplesPlugIn );