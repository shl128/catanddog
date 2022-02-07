package com.ssafy.api.controller;

import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.api.response.UserChatRoomRes;
import com.ssafy.api.service.ChatRoomService;
import com.ssafy.api.service.UserChatRoomService;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.ChatRoom;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

@Api(value = "유저 채팅룸 API", tags = {"UserChatRoom"})
@RestController
@RequestMapping("/userChatrooms")
public class UserChatRoomController {
    @Autowired
    ChatRoomService chatRoomService;

    @Autowired
    UserChatRoomService userChatRoomService;

    @GetMapping()
    @ApiOperation(value = "채팅방 전체 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })

    public ResponseEntity<List<ChatRoomRes>> findChatRoom(@ApiIgnore Authentication authentication, int page){
        List<ChatRoomRes> chatRoomResList = chatRoomService.findChatRoom(page);
        return ResponseEntity.status(200).body(chatRoomResList);
    }

    @GetMapping("title/{chat_room_title}")
    @ApiOperation(value = "채팅방 제목 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ChatRoomRes>> findChatRoomTitle(@ApiIgnore Authentication authentication, @PathVariable ("chat_room_title")String chatRoomTitle, @RequestParam int page){
        List<ChatRoomRes> chatRoomResList = chatRoomService.findChatRoomTitle(chatRoomTitle, page);
        return ResponseEntity.status(200).body(chatRoomResList);
    }

    @GetMapping("tags/{chat_room_tag_name}")
    @ApiOperation(value = "채팅방 태그 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ChatRoomRes>> findChatRoomTag(@ApiIgnore Authentication authentication, @PathVariable ("chat_room_tag_name")String chatRoomTagName, @RequestParam int page){
        List<ChatRoomRes> chatRoomResList = chatRoomService.findChatRoomTag(chatRoomTagName, page);
        return ResponseEntity.status(200).body(chatRoomResList);
    }

    @GetMapping("searchTitle/{chat_room_title}")
    @ApiOperation(value = "채팅방 제목 자동완성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<String>> findChatRoomSearchTitle(@ApiIgnore Authentication authentication, @PathVariable ("chat_room_title")String chatRoomTitle){
        List<String> list = chatRoomService.findChatRoomSearchTitle(chatRoomTitle);
        return ResponseEntity.status(200).body(list);
    }

    @GetMapping("searchHash/{chat_room_tag_name}")
    @ApiOperation(value = "채팅방 태크 자동완성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<String>> findChatRoomSearchHash(@ApiIgnore Authentication authentication, @PathVariable ("chat_room_tag_name")String chatRoomTagName){
        List<String> list = chatRoomService.findChatRoomSearchHash(chatRoomTagName);
        return ResponseEntity.status(200).body(list);
    }
}
