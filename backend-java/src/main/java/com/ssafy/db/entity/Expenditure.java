package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "expenditure")
public class Expenditure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer expenditureId;

    Long userId;
    String expenditureCategory;
    String expenditureItem;
    Integer expenditurePrice;
    Date expenditureDate;

    @Override
    public String toString() {
        return "Expenditure{" +
                ", expenditureId='" + expenditureId + '\'' +
                ", userId='" + userId + '\'' +
                ", expenditureCategory='" + expenditureCategory + '\'' +
                ", expenditureItem='" + expenditureItem + '\'' +
                ", expenditurePrice='" + expenditurePrice + '\'' +
                ", expenditureDate='" + expenditureDate + '\'' +
                '}';
    }

}
