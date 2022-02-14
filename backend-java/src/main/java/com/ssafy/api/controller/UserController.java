package com.ssafy.api.controller;

import com.ssafy.api.request.UserTagSavePostReq;
import com.ssafy.api.request.UserUpdatePostReq;
import com.ssafy.api.response.UserChatRoomRes;
import com.ssafy.db.entity.UserTag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/api/v1/myPage")
public class UserController {
	
	@Autowired
	UserService userService;

	@Autowired
	PasswordEncoder passwordEncoder;
	
	@GetMapping()
	@ApiOperation(value = "회원 본인 정보 조회(토큰 기반)", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
        @ApiResponse(code = 200, message = "성공"),
        @ApiResponse(code = 401, message = "인증 실패"),
        @ApiResponse(code = 404, message = "사용자 없음"),
        @ApiResponse(code = 500, message = "서버 오류")
    })
	public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
		/**
		 * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
		 * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
		 */
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User user = userService.getUserByUserId(userEmail);
		return ResponseEntity.status(200).body(UserRes.of(user));
	}

	@GetMapping("{user_email}")
	@ApiOperation(value = "회원 본인 정보 조회(아이디 기반)", notes = "로그인한 회원 본인의 정보를 응답한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<UserRes> checkUser(String userEmail){
		if(userService.checkUser(userEmail)){
			User user = userService.getUserByUserId(userEmail);
			return ResponseEntity.status(200).body(UserRes.of(user));
		}
		return null;
	}

	private final Logger log = LoggerFactory.getLogger(UserController.class);

	// Update(갱신)
	@PatchMapping()
	@ApiOperation(value = "userId 회원 수정", notes = "해당 아이디 회원의 정보를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> updateUser(String userEmail, @RequestBody @ApiParam(value="수정 내용", required = true)UserUpdatePostReq userUpdatePostReq, @ApiIgnore Authentication authentication) {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String getUserEmail = userDetails.getUsername();
		User user = userService.getUserByUserId(getUserEmail);
		userService.updateUser(user, userUpdatePostReq);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	// profile image Update(갱신)
	@PatchMapping("/user_photo")
	@ApiOperation(value = "프로필 이미지 수정", notes = "해당 아이디 회원의 프로필 이미지를 수정한다.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> updateProfileImage(@RequestPart("userPhoto") MultipartFile userPhoto, @ApiIgnore Authentication authentication) throws IOException {
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		String getUserEmail = userDetails.getUsername();
		User user = userService.getUserByUserId(getUserEmail);

		Base64.Encoder encoder = Base64.getEncoder();
		byte[] photoEncode = encoder.encode(userPhoto.getBytes());
		String photoImg = new String(photoEncode, "UTF8");

		userService.updateUserPhoto(user, photoImg);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	// 삭제
	@DeleteMapping()
	@ApiOperation(value = "유저 정보 삭제", notes = "유저 정보 삭제")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> deleteUser(@ApiIgnore Authentication authentication){
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		String userEmail = userDetails.getUsername();
		User user = userService.getUserByUserId(userEmail);
		userService.deleteUser(user);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@PostMapping("/tags/{user_tag_name}")
	@ApiOperation(value = "유저 해시태그 등록")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "페이지 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> saveUserTag(UserTagSavePostReq userTagSavePostReq, @ApiIgnore Authentication authentication){
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		Long userId = userDetails.getUser().getUserId();
		if(userService.saveUserTag(userTagSavePostReq, userId) == null){
			return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
		} else {
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
		}

	}

	@GetMapping("/tags")
	@ApiOperation(value = "유저 해시태그 조회")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "페이지 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<UserTag>> findUserTag(@ApiIgnore Authentication authentication){
		SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
		Long userId = userDetails.getUser().getUserId();
		List<UserTag> userTagList = userService.findByUserTag(userId);
		if(userTagList != null){
			return ResponseEntity.status(200).body(userTagList);
		}
		return ResponseEntity.status(500).body(null);
	}

	@DeleteMapping("/tags/{user_tag_id}")
	@ApiOperation(value = "유저 해시태그 삭제")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "지출내역 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> deleteUserTag(@ApiIgnore Authentication authentication, Integer userTagId){
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		Long userId = userDetails.getUser().getUserId();
		userService.deleteUserTag(userTagId, userId);
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("/rooms")
	@ApiOperation(value = "본인이 속한 채팅방 조회")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<List<UserChatRoomRes>> findUserChatRoom(@ApiIgnore Authentication authentication){
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		Long userId = userDetails.getUser().getUserId();
		List<UserChatRoomRes> userChatRoomList = userService.findUserChatRoom(userId);
		return ResponseEntity.status(200).body(userChatRoomList);
	}

	@PatchMapping("/possible")
	@ApiOperation(value = "상담 가능 여부 토글")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<? extends BaseResponseBody> updateActiveToggle(@ApiIgnore Authentication authentication){
		SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
		Long userId = userDetails.getUser().getUserId();
		userService.updateUserActive(userId);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@GetMapping("{user_nickname_check}")
	@ApiOperation(value = "닉네임 중복 체크(사용가능한 닉네임 true)", notes = "닉네임 중복 체크")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> checkUserNickname(String userNickname){
		if(userService.checkUserNickname(userNickname)){
			return ResponseEntity.status(200).body(false);
		}
		return ResponseEntity.status(200).body(true);
	}

	@GetMapping("{user_nickname_photo}")
	@ApiOperation(value = "닉네임을 통해 프로필 사진 반환", notes = "닉네임을 통해 프로필 사진 반환")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<String> checkUserNicknamePhoto(String userNickname){
		User user = userService.getUserByUserNickname(userNickname);
		return ResponseEntity.status(200).body(user.getUserPhoto());

	}
}
