package com.ssafy.api.response;

import com.ssafy.db.entity.UserTag;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("ExpenditureResponse")
public class UserTagRes {
	Integer userTagId;
	Long userId;
	String userTagName;

	public UserTagRes(Integer userTagId, Long userId, String userTagNam) {
		this.userTagId = userTagId;
		this.userId = userId;
		this.userTagName = userTagName;
	}

	public static UserTagRes of(UserTag usertag) {
		UserTagRes res = new UserTagRes(usertag.getUserTagId(), usertag.getUserId(), usertag.getUserTagName());
		return res;
	}
}
