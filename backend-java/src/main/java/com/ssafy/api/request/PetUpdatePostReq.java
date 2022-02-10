package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import java.time.OffsetDateTime;

@Getter
@Setter
public class PetUpdatePostReq {
    String petName;
    String petKind;
    String petBreed;
    String petBirthday;
    String petGender;
    boolean petNeutering;
    boolean petVaccination;
}
