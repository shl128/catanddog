package com.ssafy.api.service;

import com.ssafy.api.request.UserUpdatePostReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;

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
		user.setUserPhoto(userUpdatePostReq.getUserPhoto());
		user.setUserGrade(userUpdatePostReq.getUserGrade());
		user.setUserActive(userUpdatePostReq.getUserActive());
		// db에 update
		userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		userRepository.delete(user);
	}
}
