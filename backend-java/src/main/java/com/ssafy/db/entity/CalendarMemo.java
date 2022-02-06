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
    Long petId;
    String calendarMemoCategory;
    String calendarMemoTitle;
    String calendarMemoContent;
    Date calendarMemoDate;

    @Override
    public String toString() {
        return "calendarMemo{" +
                ", calendarMemoId='" + calendarMemoId + '\'' +
                ", userId='" + userId + '\'' +
                ", petId='" + petId + '\'' +
                ", calendarMemoCategory='" + calendarMemoCategory + '\'' +
                ", calendarMemoTitle='" + calendarMemoTitle + '\'' +
                ", calendarMemoContent='" + calendarMemoContent + '\'' +
                ", calendarMemoDate='" + calendarMemoDate + '\'' +
                '}';
    }

}
