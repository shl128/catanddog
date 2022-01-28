package com.ssafy.api.service;

import com.ssafy.db.entity.Pet;

import java.util.List;

// 펫 비즈니스 로직처리 (서비스 클래스)
public interface PetService {
    Pet savePet(Pet pet);
    List<Pet> findPet(int user_id);

    Pet update(Pet pet);
}
