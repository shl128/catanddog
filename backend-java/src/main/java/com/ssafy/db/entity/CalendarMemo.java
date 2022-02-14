package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;


@Entity
@Getter
@Setter
@Table(name = "calendarMemo")
public class CalendarMemo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer calendarMemoId;

    Long userId;
    String calendarMemoCategory;
    String calendarMemoTitle;
    Date calendarMemoStartDate;
    Date calendarMemoEndDate;

    @Override
    public String toString() {
        return "calendarMemo{" +
                ", calendarMemoId='" + calendarMemoId + '\'' +
                ", userId='" + userId + '\'' +
                ", calendarMemoCategory='" + calendarMemoCategory + '\'' +
                ", calendarMemoTitle='" + calendarMemoTitle + '\'' +
                ", calendarMemoDate='" + calendarMemoStartDate + '\'' +
                ", calendarMemoDate='" + calendarMemoEndDate + '\'' +
                '}';
    }

}
