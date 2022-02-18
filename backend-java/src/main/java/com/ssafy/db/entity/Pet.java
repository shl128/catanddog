package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "pet")
@Getter
@Setter
public class Pet{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long petId = null;

    Long userId;
    String petPhoto;
    String petName;
    String petKind;
    String petBreed;
    String petBirthday;
    String petGender;
    boolean petNeutering;
    boolean petVaccination;

    public Pet() {
    }

    public Pet(Long petId, Long userId, String petPhoto, String petName, String petKind, String petBreed, String petBirthday, String petGender, boolean petNeutering, boolean petVaccination) {
        this.petId = petId;
        this.userId = userId;
        this.petPhoto = petPhoto;
        this.petName = petName;
        this.petKind = petKind;
        this.petBreed = petBreed;
        this.petBirthday = petBirthday;
        this.petGender = petGender;
        this.petNeutering = petNeutering;
        this.petVaccination = petVaccination;
    }
}
