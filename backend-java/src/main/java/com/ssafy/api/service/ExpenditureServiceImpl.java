package com.ssafy.api.service;

import com.ssafy.api.request.ExpenditureUpdatePostReq;
import com.ssafy.api.request.ExpenditureWritePostReq;
import com.ssafy.db.entity.Expenditure;
import com.ssafy.db.repository.ExpenditureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("expenditureService")
public class ExpenditureServiceImpl implements ExpenditureService {
    @Autowired
    ExpenditureRepository expenditureRepository;


    @Override
    public Expenditure writeExpenditure(ExpenditureWritePostReq expenditureWritePostReq, Long userId) {
        Expenditure expenditure = new Expenditure();

        expenditure.setExpenditureId(expenditure.getExpenditureId());
        expenditure.setUserId(userId);
        expenditure.setExpenditureCategory(expenditureWritePostReq.getExpenditureCategory());
        expenditure.setExpenditureItem(expenditureWritePostReq.getExpenditureItem());
        expenditure.setExpenditurePrice(expenditureWritePostReq.getExpenditurePrice());
        expenditure.setExpenditureDate(expenditureWritePostReq.getExpenditureDate());

        return expenditureRepository.save(expenditure);
    }

    @Override
    public List<Expenditure> findByExpenditure(Long userId, String expenditureMonth) {
        return expenditureRepository.findByExpenditure(userId ,expenditureMonth);
    }

    @Override
    public List<Expenditure> findByExpenditureCategory(Long userId, String expenditureCategory, String expenditureMonth) {
        return expenditureRepository.findByExpenditureCategory(userId, expenditureCategory, expenditureMonth);
    }

    @Override
    public Integer findByExpenditureCount(Long userId, String expenditureMonth) {
        return expenditureRepository.findByExpenditureCount(userId, expenditureMonth);
    }

    @Override
    public Integer findByExpenditureCategoryCount(Long userId, String expenditureCategory, String expenditureMonth) {
        return expenditureRepository.findByExpenditureCategoryCount(userId, expenditureCategory, expenditureMonth);
    }

    @Override
    public List<Expenditure> findByExpenditureOne(Long userId, Integer expenditureId) {
        return expenditureRepository.findByExpenditureOne(userId, expenditureId);
    }

    @Override
    public Expenditure modifyExpenditure(ExpenditureUpdatePostReq expenditureUpdatePostReq, Integer expenditureId, Long userId) {
        Expenditure expenditure = new Expenditure();
        expenditure.setUserId(userId);
        expenditure.setExpenditureId(expenditureId);
        expenditure.setExpenditureCategory(expenditureUpdatePostReq.getExpenditureCategory());
        expenditure.setExpenditureItem(expenditureUpdatePostReq.getExpenditureItem());
        expenditure.setExpenditurePrice(expenditureUpdatePostReq.getExpenditurePrice());
        expenditure.setExpenditureDate(expenditureUpdatePostReq.getExpenditureDate());
        return expenditureRepository.save(expenditure);
    }

    @Override
    public void deleteExpenditure(Long userId, Integer expenditureId) {
        expenditureRepository.delete(userId, expenditureId);
    }
}
