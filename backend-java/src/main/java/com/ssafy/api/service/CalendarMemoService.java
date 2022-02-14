package com.ssafy.api.service;

import com.ssafy.api.request.CalendarMemoUpdatePostReq;
import com.ssafy.api.request.CalendarMemoWritePostReq;
import com.ssafy.db.entity.CalendarMemo;

import java.util.List;

public interface CalendarMemoService {
    CalendarMemo writeCalendarMemo(CalendarMemoWritePostReq calendarMemoWritePostReq, Long userId);
    List<CalendarMemo> findByCalendarMemo(Long userId);
    List<CalendarMemo> findByCalendarMemoCategory(Long userId, String calendarMemoCategory);
    List<CalendarMemo> findByCalendarMemoOne(Long userId, Integer calendarMemoId);

    CalendarMemo modifyCalendarMemo(CalendarMemoUpdatePostReq calendarMemoUpdatePostReq, Integer calendarMemoId, Long userId);

    void deleteCalendarMemo(Long userId, Integer calendarMemoId);
}
