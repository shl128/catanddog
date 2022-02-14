package com.ssafy.api.service;

import com.ssafy.api.request.ConsultSavePostReq;
import com.ssafy.db.entity.ConsultRoom;

public interface ConsultRoomService {
    ConsultRoom saveConsultRoom(Long doctorId, ConsultSavePostReq consultSavePostReq);
    void deleteConsultRoom(Long userId);
    ConsultRoom findConsultRoomByUserId(Long userId);
}
