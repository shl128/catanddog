package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

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

    String userNickname;
    String userEmail;
    String userPhone;
    Integer userKind;
    Integer userGrade;
    boolean userActive;
    Integer userRegdate;



    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String userPassword;

    @Override
    public String toString() {
        return "User{" +
                "userKind='" + userKind + '\'' +
                ", userPhone='" + userPhone + '\'' +
                ", userNickname='" + userNickname + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPassword='" + userPassword + '\'' +
                '}';
    }
}
