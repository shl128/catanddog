package com.ssafy.Socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class CatNDogWebSocketHandler extends TextWebSocketHandler {

    private static List<WebSocketSession> sessionList = new ArrayList<WebSocketSession>();

    // 해당 IP 포트로 클라이언트가 접속했을 때 실행
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception{
        String user_name = searchUserName(session);
        sessionList.add(session);
    }

    // 클라이언트가 메세지를 보냈을 때 실행
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception{
        String user_name = searchUserName(session);

        for(WebSocketSession sess: sessionList){
            sess.sendMessage(new TextMessage(user_name + ": " + message.getPayload()));
        }
    }

    // 연결이 끊어지면 실행
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception{
        String user_name = searchUserName(session);
        System.out.println("연결 끊어짐");
        for(WebSocketSession sess : sessionList){
            sess.sendMessage(new TextMessage(user_name+"님의 연결이 끊어졌습니다."));
        }
        sessionList.remove(session);
    }

    // 세션 객체에 저장해둔 user_name을 가져와서 사용하려고 만든 메소드
    public String searchUserName(WebSocketSession session)throws Exception{
        String user_name;
        Map<String, Object> map;
        map = session.getAttributes();
        user_name = (String) map.get("user_name");
        return user_name;
    }
}
