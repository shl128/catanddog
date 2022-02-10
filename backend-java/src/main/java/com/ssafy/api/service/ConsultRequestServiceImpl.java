package com.ssafy.api.service;

import com.ssafy.api.request.ConsultRequestSavePostReq;
import com.ssafy.db.entity.ConsultRequest;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ConsultRequestRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("consultRequestService")
public class ConsultRequestServiceImpl implements ConsultRequestService{
    @Autowired
    ConsultRequestRepository consultRequestRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public ConsultRequest saveConsultRequest(Long hostId, ConsultRequestSavePostReq consultRequestSavePostReq, Long doctorId) {
        ConsultRequest consultRequest = new ConsultRequest();
        consultRequest.setHostId(hostId);
        consultRequest.setUserId(doctorId);
        consultRequest.setPetName(consultRequestSavePostReq.getPetName());
        consultRequest.setPetKind(consultRequestSavePostReq.getPetKind());
        consultRequest.setPetContent(consultRequestSavePostReq.getPetContent());
        System.out.println("상담 신청 : " + consultRequest);

        return consultRequestRepository.save((consultRequest));
    }

    @Override
    public List<User> findActiveUser() {
        List<User> activeUserList = userRepository.findActiveUser();
        return activeUserList;
    }

    @Override
    public List<ConsultRequest> readByDoctorId(Long userId) {
        return consultRequestRepository.readByDoctorId(userId);
    }

    @Override
    public String readDoneStateByHostId(Long hostId) {
        if(consultRequestRepository.readDoneStateByHostId(hostId)==true){
            return "상담완료";
        }else return "상담대기";
    }

    @Override
    public void deleteDoneConsultRequest() {
        consultRequestRepository.deleteDoneConsultRequest();
    }

    @Override
    public void deleteCurrentConsultRequest(Long userId, Long hostId){
        consultRequestRepository.deleteCurrentConsultRequest(userId, hostId);
    }
}
