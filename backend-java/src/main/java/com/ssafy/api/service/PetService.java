package com.ssafy.api.service;

import com.ssafy.api.request.PetSavePostReq;
import com.ssafy.api.request.PetUpdatePostReq;
import com.ssafy.db.entity.Pet;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

// 펫 비즈니스 로직처리 (서비스 클래스)
public interface PetService {
    Pet savePet(PetSavePostReq petSavePostReq, Long userId, String photoImg);
    List<Pet> findByPet(Long userId) throws IOException;
    Pet update(PetUpdatePostReq petUpdatePostReq, Long petId, Long userId, String photoImg);

    Optional<Pet> findByPetId(Long petId);
}
