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
        calendarMemo.setPetId(calendarMemoWritePostReq.getPetId());
        calendarMemo.setCalendarMemoCategory(calendarMemoWritePostReq.getCalendarMemoCategory());
        calendarMemo.setCalendarMemoTitle(calendarMemoWritePostReq.getCalendarMemoTitle());
        calendarMemo.setCalendarMemoContent(calendarMemoWritePostReq.getCalendarMemoContent());
        calendarMemo.setCalendarMemoDate(calendarMemoWritePostReq.getCalendarMemoDate());

        return calendarMemoRepository.save(calendarMemo);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemo(Long userId, String calendarMemoMonth) {
        return calendarMemoRepository.findByCalendarMemo(userId ,calendarMemoMonth);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemoCategory(Long userId, String calendarMemoCategory, String calendarMemoMonth) {
        return calendarMemoRepository.findByCalendarMemoCategory(userId, calendarMemoCategory, calendarMemoMonth);
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
        calendarMemo.setPetId(calendarMemoUpdatePostReq.getPetId());
        calendarMemo.setCalendarMemoCategory(calendarMemoUpdatePostReq.getCalendarMemoCategory());
        calendarMemo.setCalendarMemoTitle(calendarMemoUpdatePostReq.getCalendarMemoTitle());
        calendarMemo.setCalendarMemoContent(calendarMemoUpdatePostReq.getCalendarMemoContent());
        calendarMemo.setCalendarMemoDate(calendarMemoUpdatePostReq.getCalendarMemoDate());
        return calendarMemoRepository.save(calendarMemo);
    }

    @Override
    public void deleteCalendarMemo(Long userId, Integer calendarMemoId) {
        calendarMemoRepository.delete(userId, calendarMemoId);
    }
}
