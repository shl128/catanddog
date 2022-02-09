package com.ssafy.api.controller;

import com.ssafy.api.request.PetSavePostReq;
import com.ssafy.api.request.PetUpdatePostReq;
import com.ssafy.api.response.PetRes;
import com.ssafy.api.service.PetService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Pet;
import com.ssafy.db.entity.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import retrofit2.http.Path;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

// 펫 API 컨트롤러
@Api(value = "펫 API", tags = {"Pet"})
@RestController
@RequestMapping("/petPage/pets")
public class PetController {

    @Autowired
    PetService petService;

    @PostMapping()
    @ApiOperation(value = "반려동물 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> save(@RequestPart("petPhoto") MultipartFile petPhoto, PetSavePostReq petSavePostReq, @ApiIgnore Authentication authentication, HttpServletRequest request) throws IOException {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        String root_path = request.getSession().getServletContext().getRealPath("/");

        //파일 업로드
        String petPhotoName = null;
        if (petPhoto != null) {
            petPhotoName = root_path + UUID.randomUUID().toString() + ".PNG";
            File petPhotoFile = new File(petPhotoName);
            petPhoto.transferTo(petPhotoFile);
        }
        if (petService.savePet(petSavePostReq, userId, petPhotoName) != null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    @GetMapping()
    @ApiOperation(value = "반려동물 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<Pet>> find(@ApiIgnore Authentication authentication) throws IOException {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();
        List<Pet> petInfoList = petService.findByPet(userId);

        if(petInfoList != null){
            return ResponseEntity.status(200).body(petInfoList);
        }
        return ResponseEntity.status(500).body(null);
    }

    @PatchMapping("{pet_id}")
    @ApiOperation(value = "반려동물 수정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> update(@ApiIgnore Authentication authentication, @RequestPart("pet_photo") MultipartFile petPhoto, @PathVariable("pet_id")Long petId, PetUpdatePostReq petUpdatePostReq) throws IOException {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        Long userId = userDetails.getUser().getUserId();

        if(petPhoto != null){
            String petPhotoName = UUID.randomUUID().toString();
            petUpdatePostReq.setPetPhoto(petPhotoName);
            File petPhotoFile = new File(petPhotoName + ".PNG");
            petPhoto.transferTo(petPhotoFile);
        }

        if(petService.update(petUpdatePostReq, petId, userId) != null){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
        return ResponseEntity.status(500).body(BaseResponseBody.of(500, "Error"));
    }

    @PostMapping("image/petPhoto")
    @ApiOperation(value = "반려동물 이미지 변환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<byte[]> petPhotoImage(@RequestParam String petPhoto) throws IOException{
        InputStream petPhotoImage = new FileInputStream(petPhoto);
        byte[] petPhotoByte = IOUtils.toByteArray(petPhotoImage);
        petPhotoImage.close();
        return ResponseEntity.status(200).body(petPhotoByte);
    }
}
