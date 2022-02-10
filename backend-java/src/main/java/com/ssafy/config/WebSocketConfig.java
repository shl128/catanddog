package com.ssafy.config;

import com.ssafy.Socket.CatNDogWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Autowired
    private CatNDogWebSocketHandler catndogWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry){
        // ClientLibraryUrl에 SockJS CDN을 입력해줌으로써, SockJS를 사용하도록 설정
        registry.addHandler(catndogWebSocketHandler, "/echo")  .setAllowedOrigins("*")
                .withSockJS()
                .setClientLibraryUrl(
                        "https://cdn.jsdelivr.net/sockjs/latest/sockjs.min.js")
                .setInterceptors(new HttpSessionHandshakeInterceptor());
    }
}
