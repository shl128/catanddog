package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ConsultRequestSavePostRequest")
public class ConsultRequestSavePostReq {
    String petKind;
    String petContent;
    String petName;
}
