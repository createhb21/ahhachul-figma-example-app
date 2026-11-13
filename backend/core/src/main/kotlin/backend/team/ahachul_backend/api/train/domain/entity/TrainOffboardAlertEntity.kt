package backend.team.ahachul_backend.api.train.domain.entity

import backend.team.ahachul_backend.api.common.domain.entity.StationEntity
import backend.team.ahachul_backend.api.member.domain.entity.MemberEntity
import backend.team.ahachul_backend.common.domain.entity.BaseEntity
import backend.team.ahachul_backend.common.domain.entity.SubwayLineEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

enum class TrainAlertStatusType {
    ACTIVE,
    NOTIFIED,
    CANCELLED,
}

@Entity
@Table(name = "tb_train_offboard_alert")
class TrainOffboardAlertEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "train_offboard_alert_id")
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    var member: MemberEntity,

    var trainNo: String,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subway_line_id")
    var subwayLine: SubwayLineEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "destination_station_id")
    var destinationStation: StationEntity,

    var alertBeforeStationCount: Int = 1, // e.g. 1정거장 전, 2정거장 전

    @Enumerated(EnumType.STRING)
    var status: TrainAlertStatusType = TrainAlertStatusType.ACTIVE,
) : BaseEntity() {

    fun markNotified() {
        this.status = TrainAlertStatusType.NOTIFIED
    }

    fun cancel() {
        this.status = TrainAlertStatusType.CANCELLED
    }

    companion object {
        fun of(
            member: MemberEntity,
            trainNo: String,
            subwayLine: SubwayLineEntity,
            destinationStation: StationEntity,
            alertBeforeStationCount: Int = 1,
        ): TrainOffboardAlertEntity {
            return TrainOffboardAlertEntity(
                member = member,
                trainNo = trainNo,
                subwayLine = subwayLine,
                destinationStation = destinationStation,
                alertBeforeStationCount = alertBeforeStationCount,
                status = TrainAlertStatusType.ACTIVE,
            )
        }
    }
}
