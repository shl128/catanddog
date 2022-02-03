package com.ssafy.api.controller;

import com.ssafy.api.response.ChatRoomRes;
import com.ssafy.api.service.ChatRoomService;
import com.ssafy.api.service.UserChatRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity<List<ChatRoomRes>> findChatRoom(@ApiIgnore Authentication authentication){
        return null;
    }
}
