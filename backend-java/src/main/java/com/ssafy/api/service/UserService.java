package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserTag;

import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 인터페이스 정의.
 */
public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	User getUserByUserId(String userEmail);
	boolean checkUser(String userEmail);
	boolean checkUsername(String userNickname);
	void updateUser(User user, UserUpdatePostReq userUpdatePostReq);
    void deleteUser(User user);
	UserTag saveUserTag(UserTagSavePostReq userTagSavePostReq, Long userId);

	List<UserTag> findByUserTag(Long userId);

	void deleteUserTag(Integer userTagId, Long userId);
}
