package com.ssafy.db.repository;

import com.ssafy.db.entity.ConsultRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;

public interface ConsultRequestRepository extends JpaRepository<ConsultRequest, Long> {
    @Query(value = "SELECT * from consult_request where user_id = :userId",nativeQuery = true)
    List<ConsultRequest> readByDoctorId(Long userId);

    @Query(value = "SELECT is_done from consult_request where host_id = :hostId", nativeQuery = true)
    Boolean readDoneStateByHostId(Long hostId);

    @Transactional
    @Modifying
    @Query(value = "DELETE from consult_request where is_done = 1",nativeQuery = true)
    void deleteDoneConsultRequest();

    @Transactional
    @Modifying
    @Query(value = "DELETE from consult_request where user_id = :userId and host_id = :hostId",nativeQuery = true)
    void deleteCurrentConsultRequest(Long userId, Long hostId);

    @Transactional
    @Modifying
    @Query(value = "DELETE from consult_request where host_id = :userId",nativeQuery = true)
    void deleteConsultRequestByUserId(Long userId);

    @Transactional
    @Modifying
    @Query(value = "UPDATE consult_request set is_done=1 where host_id = :hostId",nativeQuery = true)
    void modifyConsultRequestState(Long hostId);
}
