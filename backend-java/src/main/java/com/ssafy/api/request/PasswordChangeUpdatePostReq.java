package com.ssafy.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordChangeUpdatePostReq {
    @ApiModelProperty(name="유저 이메일", example="ssafy@naver.com")
    String userEmail;
    @ApiModelProperty(name="유저 Password", example="your_password")
    String userPassword;
}
