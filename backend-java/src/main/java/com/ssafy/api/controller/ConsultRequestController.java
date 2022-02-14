package com.ssafy.api.controller;

import com.ssafy.api.request.ConsultRequestSavePostReq;
import com.ssafy.api.response.ConsultRequestRes;
import com.ssafy.api.service.ConsultRequestService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.ConsultRequest;
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

import java.io.IOException;
import java.util.List;

@Api(value = "수의사 상담 신청 API", tags = {"ConsultRequest"})
@RestController
@RequestMapping("/consultRequest")
public class ConsultRequestController {
    @Autowired
    ConsultRequestService consultRequestService;

    @PostMapping
    @ApiOperation(value = "상담가능한 수의사에게 상담 신청")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ConsultRequestRes> writeConsultRequest(@ApiIgnore Authentication authentication, ConsultRequestSavePostReq consultRequestSavePostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        String userName = userDetails.getUser().getUserNickname();

        List<User> activeUserList = consultRequestService.findActiveUser();
        if(activeUserList.size()>0){
            for(int i=0; i<activeUserList.size(); i++) {
                ConsultRequest consultRequest = consultRequestService.saveConsultRequest(userId, consultRequestSavePostReq, activeUserList.get(i).getUserId());
            }
            return ResponseEntity.ok(ConsultRequestRes.of(200, "Success", activeUserList.size(), userName));
        } else if(activeUserList.size()==0){
            return ResponseEntity.ok(ConsultRequestRes.of(200, "Success", activeUserList.size(), userName));
        }
        return ResponseEntity.status(500).body(ConsultRequestRes.of(500, "Error", 0, "실패"));
    }

    @GetMapping
    @ApiOperation(value = "상담 신청 온 내역 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ConsultRequest>> readByDoctorId(@ApiIgnore Authentication authentication) throws IOException {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        List<ConsultRequest> consultRequestList = consultRequestService.readByDoctorId(userId);

        if(consultRequestList != null){
            return ResponseEntity.status(200).body(consultRequestList);
        }
        return ResponseEntity.status(500).body(null);
    }

    @GetMapping("{host_id}")
    @ApiOperation(value = "host_id가 신청한 내용이 done된 상태인지 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<String> readDoneStateByHostId(@PathVariable("host_id") Long hostId){
        return ResponseEntity.status(200).body(consultRequestService.readDoneStateByHostId(hostId));
    }

    @DeleteMapping("/done")
    @ApiOperation(value = "상담완료 상태인 상담 신청 내역 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteDoneConsultRequest(){
        consultRequestService.deleteDoneConsultRequest();
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("{host_id}")
    @ApiOperation(value = "현재 선택한 상담 신청 내역을 목록에서 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteCurrentConsultRequest(@ApiIgnore Authentication authentication, @PathVariable("host_id") Long hostId){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        consultRequestService.deleteCurrentConsultRequest(userId, hostId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping
    @ApiOperation(value = "매칭되기 전 현재 로그인한 유저가 신청한 내역을 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteConsultRequestByUserId(@ApiIgnore Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        consultRequestService.deleteConsultRequestByUserId(userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PatchMapping("{host_id}")
    @ApiOperation(value = "host_id의 상담 상태를 상담 완료로 변경")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modifyConsultRequestState(@PathVariable("host_id") Long hostId){
        consultRequestService.modifyConsultRequestState(hostId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}
