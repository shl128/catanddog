package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * 유저 모델 정의.
 */
@Entity
@Getter
@Setter
@Table(name="user")
public class User extends BaseEntity{

    String user_nickname;
    String user_email;
    Integer user_phone;
    Integer user_kind;
    Integer user_grade;
    boolean user_active;
    Integer user_regdate;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String user_password;

    @Override
    public String toString() {
        return "User{" +
                "user_kind='" + user_kind + '\'' +
                ", user_phone='" + user_phone + '\'' +
                ", user_nickname='" + user_nickname + '\'' +
                ", user_email='" + user_email + '\'' +
                ", user_password='" + user_password + '\'' +
                '}';
    }
}
