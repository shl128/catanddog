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
		user.setUser_email(userRegisterInfo.getUser_email());
		// 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
		user.setUser_password(passwordEncoder.encode(userRegisterInfo.getUser_password()));
		user.setUser_phone(userRegisterInfo.getUser_phone());
		user.setUser_nickname(userRegisterInfo.getUser_nickname());
		user.setUser_kind(userRegisterInfo.getUser_kind());

		return userRepository.save(user);
	}

	@Override
	public User getUserByUserId(String user_email) {
		// 디비에 유저 정보 조회
		User user = userRepositorySupport.findUserByUserId(user_email).get();
		return user;
	}

	@Override
	public boolean checkUser(String user_email) {
		try{
			User user = userRepositorySupport.findUserByUserId(user_email).get();
		}catch (Exception e){
			return false;
		}
		return true;
	}

	@Override
	public void updateUser(User user, UserUpdatePostReq userUpdatePostReq) {
		// 수정할 회원 정보 현재 회원 정보에 setting
		user.setUser_phone(userUpdatePostReq.getUser_phone());
		user.setUser_kind(userUpdatePostReq.getUser_kind());
		user.setUser_nickname(userUpdatePostReq.getUser_nickname());
		// db에 update
		userRepository.save(user);
	}

	@Override
	public void deleteUser(User user) {
		//Conference 삭제

		//ConferenceHistory 삭제

		userRepository.delete(user);
	}
}
