package backend.team.ahachul_backend.api.crew.adapter.web.out

import backend.team.ahachul_backend.api.crew.domain.entity.CrewMemberEntity
import backend.team.ahachul_backend.api.crew.domain.model.CrewMemberStatusType
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface CrewMemberRepository : JpaRepository<CrewMemberEntity, Long> {

    @EntityGraph(attributePaths = ["member"])
    fun findByCrewIdAndStatus(crewId: Long, status: CrewMemberStatusType): List<CrewMemberEntity>

    fun findByCrewIdAndMemberId(crewId: Long, memberId: Long): CrewMemberEntity?

    fun existsByCrewIdAndMemberIdAndStatus(
        crewId: Long,
        memberId: Long,
        status: CrewMemberStatusType,
    ): Boolean

    @EntityGraph(attributePaths = ["crew", "crew.subwayLine", "crew.station"])
    fun findByMemberIdAndStatus(memberId: Long, status: CrewMemberStatusType): List<CrewMemberEntity>
}
