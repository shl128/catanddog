package com.ssafy.api.service;

import com.ssafy.api.request.PetSavePostReq;
import com.ssafy.api.request.PetUpdatePostReq;
import com.ssafy.db.entity.Pet;

import java.util.List;

// 펫 비즈니스 로직처리 (서비스 클래스)
public interface PetService {
    Pet savePet(PetSavePostReq petSavePostReq, Long userId);
    List<Pet> findByPet(Long userId);
    Pet update(PetUpdatePostReq petUpdatePostReq, Long petId, Long userId);
}
