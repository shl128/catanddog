package com.ssafy.api.service;

import com.ssafy.db.entity.Pet;
import com.ssafy.db.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("petService")
public class PetServiceImpl implements PetService{
    @Autowired
    PetRepository petRepository;

    @Override
    public Pet savePet(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public List<Pet> findPet(int user_id) {
        return petRepository.findByUserId(user_id);
    }

    @Override
    public Pet update(Pet pet) {
        return petRepository.save(pet);
    }
}
