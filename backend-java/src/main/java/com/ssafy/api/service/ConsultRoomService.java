package com.ssafy.api.service;

import com.ssafy.api.request.ConsultSavePostReq;
import com.ssafy.db.entity.ConsultRoom;
import com.ssafy.db.entity.User;

import java.util.List;

public interface ConsultRoomService {
    ConsultRoom saveConsultRoom(Long hostId, ConsultSavePostReq consultSavePostReq);
    void deleteConsultRoom(Long userId);
    List<User> findActiveUser();
}
