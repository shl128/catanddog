package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.sql.Blob;

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
    String userPhoto;
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
                ", userNickname='" + userNickname + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPhone='" + userPhone + '\'' +
                ", userPhoto='" + userPhoto + '\'' +
                ", userKind='" + userKind + '\'' +
                ", userGrade='" + userGrade + '\'' +
                ", userActive='" + userActive + '\'' +
                ", userRegdate='" + userRegdate + '\'' +
                ", userPassword='" + userPassword + '\'' +
                '}';
    }

}
