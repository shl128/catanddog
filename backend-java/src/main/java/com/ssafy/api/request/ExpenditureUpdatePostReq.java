package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class ExpenditureUpdatePostReq {
    String expenditureCategory;
    String expenditureItem;
    Integer expenditurePrice;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    Date expenditureDate;

    @Override
    public String toString() {
        return "Expenditure{" +
                ", expenditureCategory='" + expenditureCategory + '\'' +
                ", expenditureItem='" + expenditureItem + '\'' +
                ", expenditurePrice='" + expenditurePrice + '\'' +
                ", expenditureDate='" + expenditureDate + '\'' +
                '}';
    }
}
