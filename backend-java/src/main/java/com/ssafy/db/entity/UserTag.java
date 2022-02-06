package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "userTag")
@Getter
@Setter
public class UserTag{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer userTagId;
    Long userId;
    String userTagName;

    @Override
    public String toString() {
        return "Expenditure{" +
                ", userTagId='" + userTagId + '\'' +
                ", userId='" + userId + '\'' +
                ", userTagName='" + userTagName + '\'' +
                '}';
    }

}
