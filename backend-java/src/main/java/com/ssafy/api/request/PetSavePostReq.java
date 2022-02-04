package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.annotation.Generated;
import java.time.OffsetDateTime;

@Getter
@Setter
public class PetSavePostReq {
    String petPhoto;
    String petName;
    String petKind;
    String petBreed;
    String petBirthday;
    String petGender;
    boolean petNeutering;
    boolean petVaccination;
}
