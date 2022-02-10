package com.ssafy.api.response;

import com.ssafy.db.entity.User;

import com.sun.org.apache.xpath.internal.operations.Bool;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.sql.Blob;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID", example = "ssafy@naver.com")
	String userNickname;
	String userEmail;
	String userPhone;
	String userPhoto;
	Integer userKind;
	Integer userGrade;
	boolean userActive;
	Integer userRegdate;

	public UserRes(String userEmail, Integer userKind, String userPhone, String userPhoto, String userNickname, Integer userGrade, Integer userRegdate, boolean userActive) {
		this.userEmail = userEmail;
		this.userKind = userKind;
		this.userPhone = userPhone;
		this.userPhoto = userPhoto;
		this.userNickname = userNickname;
		this.userGrade = userGrade;
		this.userActive = userActive;
		this.userRegdate = userRegdate;
	}

	public static UserRes of(User user) {
		UserRes res = new UserRes(user.getUserEmail(),user.getUserKind(), user.getUserPhone(), user.getUserPhoto(), user.getUserNickname(), user.getUserGrade(), user.getUserRegdate(), user.isUserActive());
		return res;
	}
}
