package com.ssafy.api.service;

import com.ssafy.api.request.PetSavePostReq;
import com.ssafy.api.request.PetUpdatePostReq;
import com.ssafy.api.response.PetRes;
import com.ssafy.db.entity.Pet;
import com.ssafy.db.repository.PetRepository;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

// 서비스 클래스 - 데이터 가공
@Service("petService")
public class PetServiceImpl implements PetService{
    @Autowired
    PetRepository petRepository;

    @Override
    public Pet savePet(PetSavePostReq petSavePostReq, Long UserId, String petPhotoName) {
        // Req 값 받아서 Pet 클래스로 가공
        Pet pet = new Pet();
        pet.setUserId(UserId);
        pet.setPetName(petSavePostReq.getPetName());
        pet.setPetPhoto(petPhotoName);
        pet.setPetKind(petSavePostReq.getPetKind());
        pet.setPetBreed(petSavePostReq.getPetBreed());
        pet.setPetBirthday(petSavePostReq.getPetBirthday());
        pet.setPetGender(petSavePostReq.getPetGender());
        pet.setPetNeutering(petSavePostReq.isPetNeutering());
        pet.setPetVaccination(petSavePostReq.isPetVaccination());
        return petRepository.save(pet);
    }

    @Override
    public List<Pet> findByPet(Long userId) throws IOException {
        return  petRepository.findByPet(userId);

    }

    @Override
    public Pet update(PetUpdatePostReq petUpdatePostReq, Long petId, Long userId) {
        Pet pet = new Pet();
        pet.setUserId(userId);
        pet.setPetId(petId);
        pet.setPetPhoto(petUpdatePostReq.getPetPhoto());
        pet.setPetName(petUpdatePostReq.getPetName());
        pet.setPetKind(petUpdatePostReq.getPetKind());
        pet.setPetBreed(petUpdatePostReq.getPetBreed());
        pet.setPetBirthday(petUpdatePostReq.getPetBirthday());
        pet.setPetGender(petUpdatePostReq.getPetGender());
        pet.setPetNeutering(petUpdatePostReq.isPetNeutering());
        pet.setPetVaccination(petUpdatePostReq.isPetVaccination());
        return petRepository.save(pet);
    }
}
