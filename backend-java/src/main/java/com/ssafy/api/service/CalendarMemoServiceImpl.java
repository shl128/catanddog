package com.ssafy.api.service;

import com.ssafy.api.request.CalendarMemoUpdatePostReq;
import com.ssafy.api.request.CalendarMemoWritePostReq;
import com.ssafy.db.entity.CalendarMemo;
import com.ssafy.db.repository.CalendarMemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("calendarService")
public class CalendarMemoServiceImpl implements CalendarMemoService {
    @Autowired
    CalendarMemoRepository calendarMemoRepository;


    @Override
    public CalendarMemo writeCalendarMemo(CalendarMemoWritePostReq calendarMemoWritePostReq, Long userId) {
        CalendarMemo calendarMemo = new CalendarMemo();

        calendarMemo.setCalendarMemoId(calendarMemo.getCalendarMemoId());
        calendarMemo.setUserId(userId);
        calendarMemo.setCalendarMemoCategory(calendarMemoWritePostReq.getCalendarMemoCategory());
        calendarMemo.setCalendarMemoTitle(calendarMemoWritePostReq.getCalendarMemoTitle());
        calendarMemo.setCalendarMemoStartDate(calendarMemoWritePostReq.getCalendarMemoStartDate());
        calendarMemo.setCalendarMemoEndDate(calendarMemoWritePostReq.getCalendarMemoEndDate());

        return calendarMemoRepository.save(calendarMemo);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemo(Long userId) {
        return calendarMemoRepository.findByCalendarMemo(userId);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemoCategory(Long userId, String calendarMemoCategory) {
        return calendarMemoRepository.findByCalendarMemoCategory(userId, calendarMemoCategory);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemoOne(Long userId, Integer calendarMemoId) {
        return calendarMemoRepository.findByCalendarMemoOne(userId, calendarMemoId);
    }


    @Override
    public CalendarMemo modifyCalendarMemo(CalendarMemoUpdatePostReq calendarMemoUpdatePostReq, Integer calendarMemoId, Long userId) {
        CalendarMemo calendarMemo = new CalendarMemo();
        calendarMemo.setCalendarMemoId(calendarMemoId);
        calendarMemo.setUserId(userId);
        calendarMemo.setCalendarMemoCategory(calendarMemoUpdatePostReq.getCalendarMemoCategory());
        calendarMemo.setCalendarMemoTitle(calendarMemoUpdatePostReq.getCalendarMemoTitle());
        calendarMemo.setCalendarMemoStartDate(calendarMemoUpdatePostReq.getCalendarMemoStartDate());
        calendarMemo.setCalendarMemoEndDate(calendarMemoUpdatePostReq.getCalendarMemoEndDate());
        return calendarMemoRepository.save(calendarMemo);
    }

    @Override
    public void deleteCalendarMemo(Long userId, Integer calendarMemoId) {
        calendarMemoRepository.delete(userId, calendarMemoId);
    }
}
