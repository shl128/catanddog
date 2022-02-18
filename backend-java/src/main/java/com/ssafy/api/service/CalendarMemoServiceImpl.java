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

        calendarMemo.setId(calendarMemo.getId());
        calendarMemo.setUserId(userId);
        calendarMemo.setCategory(calendarMemoWritePostReq.getCategory());
        calendarMemo.setTitle(calendarMemoWritePostReq.getTitle());
        calendarMemo.setStart(calendarMemoWritePostReq.getStart());
        calendarMemo.setEnd(calendarMemoWritePostReq.getEnd());

        return calendarMemoRepository.save(calendarMemo);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemo(Long userId) {
        return calendarMemoRepository.findByCalendarMemo(userId);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemoCategory(Long userId, String category) {
        return calendarMemoRepository.findByCalendarMemoCategory(userId, category);
    }

    @Override
    public List<CalendarMemo> findByCalendarMemoOne(Long userId, Integer id) {
        return calendarMemoRepository.findByCalendarMemoOne(userId, id);
    }


    @Override
    public CalendarMemo modifyCalendarMemo(CalendarMemoUpdatePostReq calendarMemoUpdatePostReq, Integer id, Long userId) {
        CalendarMemo calendarMemo = new CalendarMemo();
        calendarMemo.setId(id);
        calendarMemo.setUserId(userId);
        calendarMemo.setCategory(calendarMemoUpdatePostReq.getCategory());
        calendarMemo.setTitle(calendarMemoUpdatePostReq.getTitle());
        calendarMemo.setStart(calendarMemoUpdatePostReq.getStart());
        calendarMemo.setEnd(calendarMemoUpdatePostReq.getEnd());
        return calendarMemoRepository.save(calendarMemo);
    }

    @Override
    public void deleteCalendarMemo(Long userId, Integer id) {
        calendarMemoRepository.delete(userId, id);
    }
}
