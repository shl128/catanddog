package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConsultRequestResponse")
public class ConsultRequestRes extends BaseResponseBody{
    @ApiModelProperty(name="상담 신청한 회원 닉네임", example = "ssafy")
    String user_name;

    @ApiModelProperty(name="실시간 상담 가능 수의사 수", example="n명")
    int size;

    public static ConsultRequestRes of(Integer statusCode, String message, int size, String user_name) {
        ConsultRequestRes res = new ConsultRequestRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setSize(size);
        res.setUser_name(user_name);
        return res;
    }
}