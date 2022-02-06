package com.ssafy.api.service;

import com.ssafy.api.request.*;
import com.ssafy.db.entity.Expenditure;

import java.util.List;

public interface ExpenditureService {
    Expenditure writeExpenditure(ExpenditureWritePostReq expenditureWritePostReq, Long userId);
    List<Expenditure> findByExpenditure(Long userId, String expenditureMonth);
    List<Expenditure> findByExpenditureCategory(Long userId, String expenditureCategory, String expenditureMonth);
    Integer findByExpenditureCount(Long userId, String expenditureMonth);
    Integer findByExpenditureCategoryCount(Long userId, String expenditureCategory, String expenditureMonth);
    List<Expenditure> findByExpenditureOne(Long userId, Integer expenditureId);

    Expenditure modifyExpenditure(ExpenditureUpdatePostReq expenditureUpdatePostReq, Integer expenditureId, Long userId);

    void deleteExpenditure(Long userId, Integer expenditureId);
}
