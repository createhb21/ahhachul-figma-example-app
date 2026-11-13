package backend.team.ahachul_backend.api.crew.domain.entity

import backend.team.ahachul_backend.api.common.domain.entity.StationEntity
import backend.team.ahachul_backend.api.crew.domain.model.CrewCategoryType
import backend.team.ahachul_backend.api.crew.domain.model.CrewStatusType
import backend.team.ahachul_backend.api.member.domain.entity.MemberEntity
import backend.team.ahachul_backend.common.domain.entity.BaseEntity
import backend.team.ahachul_backend.common.domain.entity.SubwayLineEntity
import backend.team.ahachul_backend.common.exception.CommonException
import backend.team.ahachul_backend.common.response.ResponseCode
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
@Table(name = "tb_crew")
class CrewEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_id")
    val id: Long = 0,

    var name: String,

    var description: String,

    @Enumerated(EnumType.STRING)
    var category: CrewCategoryType,

    @Enumerated(EnumType.STRING)
    var status: CrewStatusType = CrewStatusType.ACTIVE,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subway_line_id")
    var subwayLine: SubwayLineEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id")
    var station: StationEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "leader_member_id")
    var leader: MemberEntity,

    var maxCapacity: Int = 30,

    var currentMemberCount: Int = 1,

    var iconImageUrl: String? = null,

    var meetingSchedule: String? = null,
) : BaseEntity() {

    fun increaseMemberCount() {
        if (currentMemberCount >= maxCapacity) {
            throw CommonException(ResponseCode.CREW_CAPACITY_EXCEEDED)
        }
        currentMemberCount += 1
    }

    fun decreaseMemberCount() {
        if (currentMemberCount > 1) {
            currentMemberCount -= 1
        }
    }

    fun close() {
        status = CrewStatusType.CLOSED
    }

    companion object {
        fun of(
            name: String,
            description: String,
            category: CrewCategoryType,
            subwayLine: SubwayLineEntity,
            station: StationEntity,
            leader: MemberEntity,
            maxCapacity: Int = 30,
            iconImageUrl: String? = null,
            meetingSchedule: String? = null,
        ): CrewEntity {
            return CrewEntity(
                name = name,
                description = description,
                category = category,
                subwayLine = subwayLine,
                station = station,
                leader = leader,
                maxCapacity = maxCapacity,
                currentMemberCount = 1,
                iconImageUrl = iconImageUrl,
                meetingSchedule = meetingSchedule,
            )
        }
    }
}
