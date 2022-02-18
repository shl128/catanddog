package com.ssafy.api.request;

import lombok.Getter;
import lombok.Setter;

import javax.annotation.Generated;
import java.time.OffsetDateTime;

@Getter
@Setter
public class PetSavePostReq {
    String petName;
    String petKind;
    String petBreed;
    String petBirthday;
    String petGender;
    boolean petNeutering;
    boolean petVaccination;

    @Override
    public String toString() {
        return "PetSavePostReq{" +
                ", petName='" + petName + '\'' +
                ", petKind='" + petKind + '\'' +
                ", petBreed='" + petBreed + '\'' +
                ", petBirthday='" + petBirthday + '\'' +
                ", petGender='" + petGender + '\'' +
                ", petNeutering=" + petNeutering +
                ", petVaccination=" + petVaccination +
                '}';
    }
}
