package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExpenditureUpdatePostReq {
    String expenditureCategory;
    String expenditureItem;
    Integer expenditurePrice;
    String expenditureDate;

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
