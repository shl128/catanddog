package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.api.response.UserChatRoomRes;
import com.ssafy.db.entity.User;
import com.ssafy.db.entity.UserTag;

import java.util.HashMap;
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
	void updateUserPhoto(User user, String userPhoto);
	UserTag saveUserTag(UserTagSavePostReq userTagSavePostReq, Long userId);
	List<UserTag> findByUserTag(Long userId);
	void deleteUserTag(Integer userTagId, Long userId);
	List<UserChatRoomRes> findUserChatRoom(Long userId);
	void updateUserActive(Long userId);

    String kakaoToken(String code);

	HashMap<String, Object> kakaoUserInfo(String accessToken);

	boolean checkUserNickname(String userNickname);

	User getUserByUserNickname(String userNickname);
}
