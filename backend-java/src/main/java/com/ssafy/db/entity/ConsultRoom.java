package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "video_chat_room")
@NoArgsConstructor
@Getter
@Setter
public class ConsultRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="video_chat_room", nullable = false)
    Long videoChatRoom;

    @Column(name="host_id", nullable = false)
    Long hostId;
    @Column(name="start_time", nullable = false)
    OffsetDateTime startTime = OffsetDateTime.now();
    @Column(name="doctor_id", nullable = false)
    Long doctorId;
    @Column(name="pet_kind", nullable = false)
    String petKind;
    @Column(name="pet_content", nullable = false)
    String petContent;
    @Column(name="pet_name", nullable = false)
    String petName;

    @Override
    public String toString() {
        return "ConsultRoom{" +
                "videoChatRoom=" + videoChatRoom +
                ", hostId=" + hostId +
                ", startTime=" + startTime +
                ", doctorId=" + doctorId +
                ", petKind='" + petKind + '\'' +
                ", petContent='" + petContent + '\'' +
                ", petName='" + petName + '\'' +
                '}';
    }
}
