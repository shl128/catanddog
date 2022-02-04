package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "chat_room_tag")
@Getter
@Setter
public class ChatRoomTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long chatRoomTagId = null;

    Long chatRoomId;
    String chatRoomTagName;
}
