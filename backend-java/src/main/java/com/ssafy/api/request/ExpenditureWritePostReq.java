package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ExpenditureWritePostRequest")
public class ExpenditureWritePostReq {
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
