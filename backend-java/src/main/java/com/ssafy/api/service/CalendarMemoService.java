package com.ssafy.api.service;

import com.ssafy.api.request.CalendarMemoUpdatePostReq;
import com.ssafy.api.request.CalendarMemoWritePostReq;
import com.ssafy.db.entity.CalendarMemo;

import java.util.List;

public interface CalendarMemoService {
    CalendarMemo writeCalendarMemo(CalendarMemoWritePostReq calendarMemoWritePostReq, Long userId);
    List<CalendarMemo> findByCalendarMemo(Long userId);
    List<CalendarMemo> findByCalendarMemoCategory(Long userId, String category);
    List<CalendarMemo> findByCalendarMemoOne(Long userId, Integer id);

    CalendarMemo modifyCalendarMemo(CalendarMemoUpdatePostReq calendarMemoUpdatePostReq, Integer id, Long userId);

    void deleteCalendarMemo(Long userId, Integer id);
}
