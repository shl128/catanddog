package com.ssafy.api.controller;

import com.ssafy.api.request.ExpenditureWritePostReq;
import com.ssafy.api.request.ExpenditureUpdatePostReq;
import com.ssafy.api.service.ExpenditureService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Expenditure;
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
@Api(value = "지출 API", tags = {"Expenditure"})
@RestController
@RequestMapping("/spendingOfMonth")
public class ExpenditureController {

    @Autowired
    ExpenditureService expenditureService;

    @PostMapping("/expenditures")
    @ApiOperation(value = "지출내역 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "페이지 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> write(ExpenditureWritePostReq expenditureWritePostReq, @ApiIgnore Authentication authentication){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        if(expenditureService.writeExpenditure(expenditureWritePostReq, userId) == null){
            return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }

    }

    @GetMapping("/expenditures")
    @ApiOperation(value = "지출내역 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Expenditure>> read(@ApiIgnore Authentication authentication, String expenditureCategory, String expenditureDate){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        List<Expenditure> ExpenditureInfoList;
        if (expenditureCategory.equals("전체")) {
            ExpenditureInfoList = expenditureService.findByExpenditure(userId, expenditureDate);
        } else {
            ExpenditureInfoList = expenditureService.findByExpenditureCategory(userId, expenditureCategory, expenditureDate);
        }
        if(ExpenditureInfoList != null){
            return ResponseEntity.status(200).body(ExpenditureInfoList);
        }
        return ResponseEntity.status(500).body(null);
    }

    @GetMapping("/expendituresOne")
    @ApiOperation(value = "지출내역 단일조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Expenditure>> readOne(@ApiIgnore Authentication authentication, Integer expenditureId){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        List<Expenditure> ExpenditureInfoList;
        ExpenditureInfoList = expenditureService.findByExpenditureOne(userId, expenditureId);
        if(ExpenditureInfoList != null){
            return ResponseEntity.status(200).body(ExpenditureInfoList);
        }
        return ResponseEntity.status(500).body(null);
    }


    @PatchMapping("/expenditures")
    @ApiOperation(value = "지출내역 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> modify(@ApiIgnore Authentication authentication, Integer expenditureId, ExpenditureUpdatePostReq expenditureUpdatePostReq){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        if(expenditureService.modifyExpenditure(expenditureUpdatePostReq, expenditureId, userId) != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    // 삭제
    @DeleteMapping("/expenditures")
    @ApiOperation(value = "지출내역 삭제")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> delete(@ApiIgnore Authentication authentication, Integer expenditureId){
        SsafyUserDetails userDetails = (SsafyUserDetails)authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        expenditureService.deleteExpenditure(userId, expenditureId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    // 지출금액 합계
    @GetMapping("/totalAmountOfPayment/{expenditures_category}")
    @ApiOperation(value = "지출내역 총합계")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "지출내역 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity count(@ApiIgnore Authentication authentication, String expenditureCategory, String expenditureMonth){
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        Integer ExpenditureAmount;
        if (expenditureCategory.equals("전체")) {
            ExpenditureAmount = expenditureService.findByExpenditureCount(userId, expenditureMonth);
        } else {
            ExpenditureAmount = expenditureService.findByExpenditureCategoryCount(userId, expenditureCategory, expenditureMonth);
        }
        if(ExpenditureAmount != null){
            return ResponseEntity.status(200).body(ExpenditureAmount);
        }
        return ResponseEntity.status(200).body(0);
    }
}
