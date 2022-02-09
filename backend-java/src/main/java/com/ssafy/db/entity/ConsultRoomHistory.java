package com.ssafy.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "video_chat_room_history")
@NoArgsConstructor
@Getter
@Setter
public class ConsultRoomHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="video_chat_room_history_id", nullable = false)
    Long videoChatRoomHistoryId;

    @Column(name="host_id", nullable = false)
    Long hostId;
    @Column(name="start_time", nullable = false)
    OffsetDateTime startTime;
    @Column(name="end_time", nullable = false)
    OffsetDateTime endTime = OffsetDateTime.now();
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
        return "ConsultRoomHistory{" +
                "videoChatRoomHistoryId=" + videoChatRoomHistoryId +
                ", hostId=" + hostId +
                ", startTime=" + startTime +
                ", endTime=" + endTime +
                ", doctorId=" + doctorId +
                ", petKind='" + petKind + '\'' +
                ", petContent='" + petContent + '\'' +
                ", petName='" + petName + '\'' +
                '}';
    }
}
