package com.ssafy.api.controller;

import com.ssafy.api.request.PetSavePostReq;
import com.ssafy.api.request.UserChatSavePostReq;
import com.ssafy.api.service.ChatRoomService;
import com.ssafy.api.service.ChatRoomTagService;
import com.ssafy.api.service.UserChatRoomService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.ChatRoom;
import com.ssafy.db.entity.UserChatRoom;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import retrofit2.http.Path;
import springfox.documentation.annotations.ApiIgnore;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Api(value = "유저 채팅 API", tags = {"UserChat"})
@RestController
@RequestMapping("/userChat")
public class ChatRoomController {
    @Autowired
    ChatRoomService chatRoomService;

    @Autowired
    UserChatRoomService userChatRoomService;

    @Autowired
    ChatRoomTagService chatRoomTagService;

    @PostMapping()
    @ApiOperation(value = "채팅방 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> saveChatRoom(@ApiIgnore Authentication authentication, UserChatSavePostReq userChatSavePostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        ChatRoom chatRoom = chatRoomService.saveChatRoom(userChatSavePostReq, userId);
        if(chatRoom != null){
            chatRoomTagService.saveChatRoomTag(chatRoom.getChatRoomId(), userChatSavePostReq.getChatRoomTagName());
            userChatRoomService.saveUserChatRoom(chatRoom.getChatRoomId(), userId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    @PostMapping("{chat_room_id}")
    @ApiOperation(value = "채팅방 진입")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> saveUserChatRoom(@ApiIgnore Authentication authentication, @PathVariable("chat_room_id") Long chatRoomId){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        if(userChatRoomService.saveUserChatRoom(chatRoomId, userId) != null){
            chatRoomService.enterUserChatRoom(chatRoomId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    @PatchMapping("{chat_room_id}")
    @ApiOperation(value = "채팅방 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateUserChatRoom(@ApiIgnore Authentication authentication, @PathVariable("chat_room_id") Long chatRoomId, UserChatSavePostReq userChatSavePostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        if(chatRoomService.updateChatRoom(userChatSavePostReq, chatRoomId, userId) != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    @DeleteMapping("/exit/{chat_room_id}")
    @ApiOperation(value = "채팅방 나가기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteUserChatRoom(@ApiIgnore Authentication authentication, @PathVariable("chat_room_id") Long chatRoomId){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        userChatRoomService.deleteUserChatRoom(chatRoomId, userId);
        chatRoomService.exitUserChatRoom(chatRoomId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }

    @DeleteMapping("{chat_room_id}")
    @ApiOperation(value = "채팅방 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteChatRoom(@ApiIgnore Authentication authentication, @PathVariable("chat_room_id") Long chatRoomId){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        chatRoomService.deleteChatRoom(chatRoomId, userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("file")
    @ApiOperation(value = "채팅방 파일 첨부")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> saveChatRoomFile(@RequestPart("chatFile") MultipartFile chatFile, @ApiIgnore Authentication authentication) throws IOException {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();

        String chatFileName = null;
        if (chatFile != null) {
            chatFileName = UUID.randomUUID().toString();
            File file = new File(chatFileName + ".PNG");
            chatFile.transferTo(file);
        }
        return ResponseEntity.status(200).body(chatFileName);
    }
}
