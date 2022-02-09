package com.ssafy.api.controller;

import com.ssafy.api.request.ConsultSavePostReq;
import com.ssafy.api.service.ConsultRoomService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.ConsultRoom;
import com.ssafy.db.entity.User;
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

@Api(value = "수의사 화상 상담 API", tags = {"WebChat"})
@RestController
@RequestMapping("/webChat")
public class ConsultRoomController {
    @Autowired
    ConsultRoomService consultRoomService;

    @PostMapping("/open/{doctor_id}")
    @ApiOperation(value = "수의사와 실시간 상담방 생성")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> saveConsultRoom(@ApiIgnore Authentication authentication, ConsultSavePostReq consultSavePostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        ConsultRoom consultRoom = consultRoomService.saveConsultRoom(userId, consultSavePostReq);
        if(consultRoom != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    @DeleteMapping
    @ApiOperation(value = "수의사와 실시간 상담방 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteConsultRoom(@ApiIgnore Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        consultRoomService.deleteConsultRoom(userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
    
    @GetMapping
    @ApiOperation(value = "상담 가능한 수의사 리스트 가져오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<User>> find(){
        List<User> activeUserList = consultRoomService.findActiveUser();
        if(activeUserList != null){
            return ResponseEntity.status(200).body(activeUserList);
        }
        return ResponseEntity.status(500).body(null);
    }
}
