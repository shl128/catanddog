package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "consult_request")
@NoArgsConstructor
@Getter
@Setter
public class ConsultRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="consult_request_id", nullable = false)
    Long consultRequestId;

    @Column(name="user_id", nullable = false)
    Long userId;
    @Column(name="host_id", nullable = false)
    Long hostId;
    @Column(name="pet_name", nullable = false)
    String petName;
    @Column(name="pet_kind", nullable = false)
    String petKind;
    @Column(name="pet_content", nullable = false)
    String petContent;
    @Column(name="request_time", nullable = false)
    OffsetDateTime requestTime = OffsetDateTime.now();
    @Column(name="is_done", nullable = false)
    boolean isDone = false;
    String hostNickname;


    @Override
    public String toString() {
        return "ConsultRequest{" +
                "consultRequestId=" + consultRequestId +
                ", userId=" + userId +
                ", hostId=" + hostId +
                ", petName='" + petName + '\'' +
                ", petKind='" + petKind + '\'' +
                ", petContent='" + petContent + '\'' +
                ", requestTime=" + requestTime +
                ", isDone=" + isDone +
                '}';
    }
}
