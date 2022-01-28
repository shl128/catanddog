package com.ssafy.api.service;

import com.ssafy.api.request.UserLoginPostReq;
import com.ssafy.api.request.UserUpdatePostReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

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
}
