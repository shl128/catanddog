package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
@ApiModel("CalendarMemoWritePostRequest")
public class CalendarMemoWritePostReq {
    String category;
    String title;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date start;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date end;

    @Override
    public String toString() {
        return "CalendarMemo{" +
                ", category='" + category + '\'' +
                ", title='" + title + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }
}
