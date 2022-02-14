package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConsultSavePostReq {
    Long hostId;
    String petKind;
    String petContent;
    String petName;
}
