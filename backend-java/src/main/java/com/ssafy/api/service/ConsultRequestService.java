package com.ssafy.api.service;

import com.ssafy.api.request.ConsultRequestSavePostReq;
import com.ssafy.db.entity.ConsultRequest;
import com.ssafy.db.entity.User;

import java.util.List;

public interface ConsultRequestService {
    ConsultRequest saveConsultRequest(Long hostId, ConsultRequestSavePostReq consultRequestSavePostReq, Long doctorId);
    List<User> findActiveUser();
    List<ConsultRequest> readByDoctorId(Long userId);
    String readDoneStateByHostId(Long hostId);
    void deleteDoneConsultRequest();
    void deleteCurrentConsultRequest(Long userId, Long hostId);
    void deleteConsultRequestByUserId(Long userId);
    void modifyConsultRequestState(Long hostId);
}
