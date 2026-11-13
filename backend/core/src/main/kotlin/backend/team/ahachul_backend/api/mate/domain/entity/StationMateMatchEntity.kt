package backend.team.ahachul_backend.api.mate.domain.entity

import backend.team.ahachul_backend.api.common.domain.entity.StationEntity
import backend.team.ahachul_backend.api.mate.domain.model.MateMatchStatusType
import backend.team.ahachul_backend.api.member.domain.entity.MemberEntity
import backend.team.ahachul_backend.common.domain.entity.BaseEntity
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

@Entity
@Table(name = "tb_station_mate_match")
class StationMateMatchEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mate_match_id")
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requester_member_id")
    var requester: MemberEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "target_member_id")
    var target: MemberEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id")
    var station: StationEntity,

    var message: String,

    @Enumerated(EnumType.STRING)
    var status: MateMatchStatusType = MateMatchStatusType.PENDING,
) : BaseEntity() {

    fun accept() {
        this.status = MateMatchStatusType.ACCEPTED
    }

    fun reject() {
        this.status = MateMatchStatusType.REJECTED
    }

    companion object {
        fun of(
            requester: MemberEntity,
            target: MemberEntity,
            station: StationEntity,
            message: String,
        ): StationMateMatchEntity {
            return StationMateMatchEntity(
                requester = requester,
                target = target,
                station = station,
                message = message,
                status = MateMatchStatusType.PENDING,
            )
        }
    }
}
