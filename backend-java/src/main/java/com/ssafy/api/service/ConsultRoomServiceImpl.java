package com.ssafy.api.service;

import com.ssafy.api.request.ConsultSavePostReq;
import com.ssafy.db.entity.ConsultRoom;
import com.ssafy.db.entity.ConsultRoomHistory;
import com.ssafy.db.repository.ConsultRequestRepository;
import com.ssafy.db.repository.ConsultRoomHistoryRepository;
import com.ssafy.db.repository.ConsultRoomRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("consultRoomService")
public class ConsultRoomServiceImpl implements ConsultRoomService{
    @Autowired
    ConsultRoomRepository consultRoomRepository;

    @Autowired
    ConsultRoomHistoryRepository consultRoomHistoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConsultRequestRepository consultRequestRepository;

    @Override
    public ConsultRoom saveConsultRoom(Long doctorId, ConsultSavePostReq consultSavePostReq) {
        ConsultRoom consultRoom = new ConsultRoom();
        consultRoom.setDoctorId(doctorId);
        consultRoom.setHostId(consultSavePostReq.getHostId());
        consultRoom.setPetKind(consultSavePostReq.getPetKind());
        consultRoom.setPetContent(consultSavePostReq.getPetContent());
        consultRoom.setPetName(consultSavePostReq.getPetName());
        userRepository.updateUserActive(doctorId);
        // host_id 로 온 신청 내역 is_done=1로 변경
        consultRequestRepository.modifyConsultRequestState(consultSavePostReq.getHostId());
        // host_id 로 온 신청 내역 삭제
        consultRequestRepository.deleteCurrentConsultRequest(doctorId, consultSavePostReq.getHostId());

        return consultRoomRepository.save((consultRoom));
    }

    @Override
    public void deleteConsultRoom(Long userId) {
        ConsultRoom consultRoom = consultRoomRepository.findByUserId(userId);
        ConsultRoomHistory consultRoomHistory = new ConsultRoomHistory();
        consultRoomHistory.setHostId(consultRoom.getHostId());
        consultRoomHistory.setStartTime(consultRoom.getStartTime());
        consultRoomHistory.setDoctorId(consultRoom.getDoctorId());
        consultRoomHistory.setPetKind(consultRoom.getPetKind());
        consultRoomHistory.setPetContent(consultRoom.getPetContent());
        consultRoomHistory.setPetName(consultRoom.getPetName());

        if(consultRoom.getHostId() == userId){
           consultRoomHistoryRepository.save((consultRoomHistory));
           consultRoomRepository.deleteByUserId(userId);
        }
    }

    @Override
    public ConsultRoom findConsultRoomByUserId(Long userId) {
        ConsultRoom consultRoom = consultRoomRepository.findConsultRoomByUserId(userId);
        return consultRoom;
    }
}
