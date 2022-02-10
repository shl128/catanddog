package com.ssafy.api.service;

import com.ssafy.api.request.UserTagSavePostReq;
import com.ssafy.api.request.UserUpdatePostReq;
import com.ssafy.api.response.UserChatRoomRes;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.UserTag;
import com.ssafy.db.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;

import java.util.ArrayList;
import java.util.List;

/**
 *	유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("UserService")
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserRepositorySupport userRepositorySupport;
	@Autowired
	ChatRoomTagRepository chatRoomTagRepository;
	@Autowired
	ChatRoomRepository chatRoomRepository;
	@Autowired
	UserTagRepository userTagRepository;
	@Autowired
	PasswordEncoder passwordEncoder;

	@Override
	public User createUser(UserRegisterPostReq userRegisterInfo) {
		User user = new User();
		user.setUserEmail(userRegisterInfo.getUserEmail());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUserPassword(passwordEncoder.encode(userRegisterInfo.getUserPassword()));
		user.setUserPhone(userRegisterInfo.getUserPhone());
		user.setUserNickname(userRegisterInfo.getUserNickname());
		user.setUserKind(userRegisterInfo.getUserKind());

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String userEmail) {
		// 디비에 유저 정보 조회
		User user = userRepositorySupport.findUserByUserId(userEmail).get();
		return user;
	}

	@Override
	public boolean checkUser(String userEmail) {
		try{
			User user = userRepositorySupport.findUserByUserId(userEmail).get();
		}catch (Exception e){
			return false;
		}
		return true;
	}

	@Override
	public boolean checkUsername(String userNickname) {
		try{
			User user = userRepositorySupport.findUserByUserNickname(userNickname).get();
		}catch (Exception e){
			return false;
		}
		return true;
	}

	@Override
	public void updateUser(User user, UserUpdatePostReq userUpdatePostReq) {
		// 수정할 회원 정보 현재 회원 정보에 setting
		user.setUserPhone(userUpdatePostReq.getUserPhone());
		user.setUserKind(userUpdatePostReq.getUserKind());
		user.setUserNickname(userUpdatePostReq.getUserNickname());
		user.setUserGrade(userUpdatePostReq.getUserGrade());
		user.setUserActive(userUpdatePostReq.getUserActive());
		// db에 update
		userRepository.save(user);
	}

	@Override
	public void updateUserPhoto(User user, String userPhoto) {
		user.setUserPhoto(userPhoto);
		// db에 update
		userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
	}


	@Override
	public UserTag saveUserTag(UserTagSavePostReq userTagSavePostReq, Long userId) {
		UserTag userTag = new UserTag();

		userTag.setUserTagId(userTag.getUserTagId());
		userTag.setUserId(userId);
		userTag.setUserTagName(userTagSavePostReq.getUserTagName());

		return userTagRepository.save(userTag);
	}

	@Override
	public List<UserTag> findByUserTag(Long userId) {

		return userTagRepository.findByUserTag(userId);
	}

	@Override
	public void deleteUserTag(Integer userTagId, Long userId) {
		userTagRepository.deleteUserTag(userTagId, userId);
	}

	@Override
	public List<UserChatRoomRes> findUserChatRoom(Long userId) {
		List<UserChatRoomRes> userChatRoomList = new ArrayList<>();
		List<ChatRoom> chatRoomList = chatRoomRepository.findByUserChatRoom(userId);
		for(int i=0; i<chatRoomList.size(); i++){
			UserChatRoomRes userChatRoomRes = new UserChatRoomRes();
			ChatRoom chatRoom = chatRoomList.get(i);
			userChatRoomRes.setUserChatRoomId(chatRoom.getChatRoomId());
			userChatRoomRes.setChatRoomId(chatRoom.getChatRoomId());
			userChatRoomRes.setHostId(chatRoom.getHostId());
			userChatRoomRes.setChatRoomTitle(chatRoom.getChatRoomTitle());
			userChatRoomRes.setUserMaxCount(chatRoom.getUserMaxCount());
			userChatRoomRes.setUserNowCount(chatRoom.getUserNowCount());
			List<String> tagName = chatRoomTagRepository.findByTag(chatRoom.getChatRoomId());
			userChatRoomRes.setTagName(tagName);
			userChatRoomList.add(userChatRoomRes);
		}
		return userChatRoomList;
	}

	@Override
	public void updateUserActive(Long userId) {
		userRepository.updateUserActive(userId);
	}


}
