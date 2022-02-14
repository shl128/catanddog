package com.ssafy.db.repository;

import com.ssafy.db.entity.CalendarMemo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CalendarMemoRepository extends JpaRepository <CalendarMemo, Integer> {
//    @Query(value = "SELECT * from calendar_memo where user_id = :userId and DATE_FORMAT(calendar_memo_date, '%Y-%m') = :calendarMemoMonth order by calendar_memo_id desc",nativeQuery = true)
//    List<CalendarMemo> findByCalendarMemo(@Param("userId") Long userId, @Param("calendarMemoMonth") String calendarMemoMonth);
//    @Query(value = "SELECT * from calendar_memo where user_id = :userId and calendar_memo_category = :calendarMemoCategory and DATE_FORMAT(calendar_memo_date, '%Y-%m') = :calendarMemoMonth order by calendar_memo_id desc",nativeQuery = true)
//    List<CalendarMemo> findByCalendarMemoCategory(@Param("userId") Long userId, @Param("calendarMemoCategory") String calendarMemoCategory, @Param("calendarMemoMonth") String calendarMemoMonth);

    @Query(value = "SELECT * from calendar_memo where user_id = :userId order by id desc",nativeQuery = true)
    List<CalendarMemo> findByCalendarMemo(@Param("userId") Long userId);

    @Query(value = "SELECT * from calendar_memo where user_id = :userId and category = :category order by id desc",nativeQuery = true)
    List<CalendarMemo> findByCalendarMemoCategory(@Param("userId") Long userId, @Param("category") String category);

    @Query(value = "SELECT * from calendar_memo where user_id = :userId and id = :id",nativeQuery = true)
    List<CalendarMemo> findByCalendarMemoOne(@Param("userId") Long userId, @Param("id")  Integer id);

    @Transactional
    @Modifying
    @Query(value = "delete from calendar_memo where user_id = :userId and id = :id", nativeQuery = true)
    void delete(Long userId, Integer id);
}
