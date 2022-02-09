package com.ssafy.api.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PetRes {
    Long petId;
    Long userId;
    byte[] petPhoto;
    String petName;
    String petKind;
    String petBreed;
    String petBirthday;
    String petGender;
    boolean petNeutering;
    boolean petVaccination;
}
