package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import com.sun.org.apache.xpath.internal.operations.Bool;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID")
	String user_nickname;
	String user_email;
	Integer user_phone;
	Integer user_kind;
	Integer user_grade;
	Bool user_active;
	Integer user_regdate;

	public UserRes(String user_email, Integer user_kind, Integer user_phone, String user_nickname, Integer user_grade, Integer user_regdate) {
		this.user_email = user_email;
		this.user_kind = user_kind;
		this.user_phone = user_phone;
		this.user_nickname = user_nickname;
		this.user_grade = user_grade;
		this.user_active = user_active;
		this.user_regdate = user_regdate;
	}

	public static UserRes of(User user) {
		UserRes res = new UserRes(user.getUser_email(),user.getUser_kind(), user.getUser_phone(), user.getUser_nickname(), user.getUser_grade(), user.getUser_regdate());
		return res;
	}
}
