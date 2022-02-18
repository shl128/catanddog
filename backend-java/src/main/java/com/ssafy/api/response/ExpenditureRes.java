package com.ssafy.api.response;

import com.ssafy.db.entity.Expenditure;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("ExpenditureResponse")
public class ExpenditureRes {
	Integer expenditureId;

	Long userId;
	String expenditureCategory;
	String expenditureItem;
	Integer expenditurePrice;
	Date expenditureDate;

	public ExpenditureRes(Integer expenditureId, Long userId, String expenditureCategory, String expenditureItem, Integer expenditurePrice, Date expenditureDate) {
		this.expenditureId = expenditureId;
		this.userId = userId;
		this.expenditureCategory = expenditureCategory;
		this.expenditureItem = expenditureItem;
		this.expenditurePrice = expenditurePrice;
		this.expenditureDate = expenditureDate;
	}

	public static ExpenditureRes of(Expenditure expenditure) {
		ExpenditureRes res = new ExpenditureRes(expenditure.getExpenditureId(), expenditure.getUserId(), expenditure.getExpenditureCategory(), expenditure.getExpenditureItem(), expenditure.getExpenditurePrice(), expenditure.getExpenditureDate());
		return res;
	}
}
