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
    Integer id;

    Long userId;
    String category;
    String title;
    Date start;
    Date end;

    @Override
    public String toString() {
        return "calendarMemo{" +
                ", id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", category='" + category + '\'' +
                ", title='" + title + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }

}
