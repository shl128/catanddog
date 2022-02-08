package com.ssafy.db.repository;

import com.ssafy.db.entity.ConsultRoomHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultRoomHistoryRepository extends JpaRepository<ConsultRoomHistory, Long> {

}
