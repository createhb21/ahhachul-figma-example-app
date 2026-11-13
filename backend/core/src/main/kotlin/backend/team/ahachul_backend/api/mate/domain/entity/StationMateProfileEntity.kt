package backend.team.ahachul_backend.api.mate.domain.entity

import backend.team.ahachul_backend.api.common.domain.entity.StationEntity
import backend.team.ahachul_backend.api.mate.domain.model.MateProfileStatusType
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
import jakarta.persistence.OneToOne
import jakarta.persistence.Table

@Entity
@Table(name = "tb_station_mate_profile")
class StationMateProfileEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mate_profile_id")
    val id: Long = 0,

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    var member: MemberEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id")
    var station: StationEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subway_line_id")
    var subwayLine: SubwayLineEntity,

    var commuteTimeRange: String,

    var bio: String,

    var mbti: String? = null,

    var interests: String? = null,

    @Enumerated(EnumType.STRING)
    var status: MateProfileStatusType = MateProfileStatusType.ACTIVE,
) : BaseEntity() {

    fun update(
        station: StationEntity,
        subwayLine: SubwayLineEntity,
        commuteTimeRange: String,
        bio: String,
        mbti: String?,
        interests: String?,
        status: MateProfileStatusType,
    ) {
        this.station = station
        this.subwayLine = subwayLine
        this.commuteTimeRange = commuteTimeRange
        this.bio = bio
        this.mbti = mbti
        this.interests = interests
        this.status = status
    }

    companion object {
        fun of(
            member: MemberEntity,
            station: StationEntity,
            subwayLine: SubwayLineEntity,
            commuteTimeRange: String,
            bio: String,
            mbti: String? = null,
            interests: String? = null,
        ): StationMateProfileEntity {
            return StationMateProfileEntity(
                member = member,
                station = station,
                subwayLine = subwayLine,
                commuteTimeRange = commuteTimeRange,
                bio = bio,
                mbti = mbti,
                interests = interests,
                status = MateProfileStatusType.ACTIVE,
            )
        }
    }
}
