package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class CalendarMemoUpdatePostReq {
    String calendarMemoCategory;
    String calendarMemoTitle;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date calendarMemoStartDate;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date calendarMemoEndDate;

    @Override
    public String toString() {
        return "CalendarMemo{" +
                ", calendarMemoCategory='" + calendarMemoCategory + '\'' +
                ", calendarMemoTitle='" + calendarMemoTitle + '\'' +
                ", calendarMemoDate='" + calendarMemoStartDate + '\'' +
                ", calendarMemoDate='" + calendarMemoEndDate + '\'' +
                '}';
    }
}
