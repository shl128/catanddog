package com.ssafy.api.service;

import com.ssafy.api.request.ConsultSavePostReq;
import com.ssafy.db.entity.ConsultRoom;
import com.ssafy.db.entity.ConsultRoomHistory;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.ConsultRoomHistoryRepository;
import com.ssafy.db.repository.ConsultRoomRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("consultRoomService")
public class ConsultRoomServiceImpl implements ConsultRoomService{
    @Autowired
    ConsultRoomRepository consultRoomRepository;

    @Autowired
    ConsultRoomHistoryRepository consultRoomHistoryRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public ConsultRoom saveConsultRoom(Long hostId, ConsultSavePostReq consultSavePostReq) {
        ConsultRoom consultRoom = new ConsultRoom();
        consultRoom.setHostId(hostId);
        consultRoom.setDoctorId(consultSavePostReq.getDoctorId());
        consultRoom.setPetKind(consultSavePostReq.getPetKind());
        consultRoom.setPetContent(consultSavePostReq.getPetContent());
        consultRoom.setPetName(consultSavePostReq.getPetName());

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
    public List<User> findActiveUser() {
        List<User> activeUserList = userRepository.findActiveUser();
        return activeUserList;
    }
}
