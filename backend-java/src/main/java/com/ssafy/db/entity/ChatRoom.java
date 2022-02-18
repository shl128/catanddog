package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Entity
@Table(name = "chat_room")
@Getter
@Setter
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long chatRoomId = null;

    Long hostId;
    String chatRoomTitle;
    OffsetDateTime startTime = OffsetDateTime.now();
    int userMaxCount;
    int userNowCount = 1;
    public ChatRoom() {
    }

    @Override
    public String toString() {
        return "ChatRoom{" +
                "chatRoomId=" + chatRoomId +
                ", hostId=" + hostId +
                ", chatRoomTitle='" + chatRoomTitle + '\'' +
                ", startTime=" + startTime +
                ", userMaxCount=" + userMaxCount +
                ", userNowCount=" + userNowCount +
                '}';
    }
}
