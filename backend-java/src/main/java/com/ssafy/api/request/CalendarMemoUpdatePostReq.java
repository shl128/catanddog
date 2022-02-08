package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class CalendarMemoUpdatePostReq {
    Long petId;
    String calendarMemoCategory;
    String calendarMemoTitle;
    String calendarMemoContent;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date calendarMemoDate;

    @Override
    public String toString() {
        return "CalendarMemo{" +
                ", petId='" + petId + '\'' +
                ", calendarMemoCategory='" + calendarMemoCategory + '\'' +
                ", calendarMemoTitle='" + calendarMemoTitle + '\'' +
                ", calendarMemoContent='" + calendarMemoContent + '\'' +
                ", calendarMemoDate='" + calendarMemoDate + '\'' +
                '}';
    }
}
