package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class PetUpdatePostReq {
    String petPhoto;
    String petName;
    String petKind;
    String petBreed;
    OffsetDateTime petBirthday;
    String petGender;
    boolean petNeutering;
    boolean petVaccination;
}
