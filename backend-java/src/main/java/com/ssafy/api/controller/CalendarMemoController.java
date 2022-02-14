package com.ssafy.api.controller;

import com.ssafy.api.request.CalendarMemoUpdatePostReq;
import com.ssafy.api.request.CalendarMemoWritePostReq;
import com.ssafy.api.service.CalendarMemoService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.CalendarMemo;
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

// 펫 API 컨트롤러
@Api(value = "캘린더 API", tags = {"Calendar"})
@RestController
@RequestMapping("/calendar")
public class CalendarMemoController {

    @Autowired
    CalendarMemoService calendarMemoService;

    @PostMapping("/memo")
    @ApiOperation(value = "캘린더 메모 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "페이지 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> write(CalendarMemoWritePostReq calendarMemoWritePostReq, @ApiIgnore Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        if(calendarMemoService.writeCalendarMemo(calendarMemoWritePostReq, userId) == null){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }

    }

    //전체조회
    @GetMapping("")
    @ApiOperation(value = "캘린더 메모 전체 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<CalendarMemo>> read(@ApiIgnore Authentication authentication, String category){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        List<CalendarMemo> CalendarMemoInfoList;
        if (category.equals("전체")) {
            CalendarMemoInfoList = calendarMemoService.findByCalendarMemo(userId);
        } else {
            CalendarMemoInfoList = calendarMemoService.findByCalendarMemoCategory(userId, category);
        }
        if(CalendarMemoInfoList != null){
            return ResponseEntity.status(200).body(CalendarMemoInfoList);
        }
        return ResponseEntity.status(500).body(null);
    }

    //단일조회
    @GetMapping("/memo")
    @ApiOperation(value = "캘린더 메모 단일 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<CalendarMemo>> read(@ApiIgnore Authentication authentication, Integer id){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        List<CalendarMemo> CalendarMemoInfoList = calendarMemoService.findByCalendarMemoOne(userId, id);
        if(CalendarMemoInfoList != null){
            return ResponseEntity.status(200).body(CalendarMemoInfoList);
        }
        return ResponseEntity.status(500).body(null);
    }

    //수정
    @PatchMapping("/memo")
    @ApiOperation(value = "캘린더 메모 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modify(@ApiIgnore Authentication authentication, Integer id, CalendarMemoUpdatePostReq calendarMemoUpdatePostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        if(calendarMemoService.modifyCalendarMemo(calendarMemoUpdatePostReq, id, userId) != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    // 삭제
    @DeleteMapping("/memo")
    @ApiOperation(value = "캘린더 메모 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, Integer id){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        calendarMemoService.deleteCalendarMemo(userId, id);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

}
