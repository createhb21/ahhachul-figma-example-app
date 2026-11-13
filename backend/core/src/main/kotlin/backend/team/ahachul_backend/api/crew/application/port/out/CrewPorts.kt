package backend.team.ahachul_backend.api.crew.application.port.out

import backend.team.ahachul_backend.api.crew.domain.entity.CrewEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewMemberEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewPostEntity
import backend.team.ahachul_backend.api.crew.domain.model.CrewCategoryType
import backend.team.ahachul_backend.api.crew.domain.model.CrewMemberStatusType
import backend.team.ahachul_backend.api.crew.domain.model.CrewStatusType

interface CrewReader {
    fun findById(id: Long): CrewEntity?
    fun findBySubwayLineId(subwayLineId: Long): List<CrewEntity>
    fun findByStationId(stationId: Long): List<CrewEntity>
    fun findByCategory(category: CrewCategoryType): List<CrewEntity>
    fun findAllActive(): List<CrewEntity>
}

interface CrewWriter {
    fun save(entity: CrewEntity): CrewEntity
}

interface CrewMemberReader {
    fun findApprovedMembers(crewId: Long): List<CrewMemberEntity>
    fun findByCrewAndMember(crewId: Long, memberId: Long): CrewMemberEntity?
    fun isMember(crewId: Long, memberId: Long): Boolean
    fun findMyCrews(memberId: Long): List<CrewMemberEntity>
}

interface CrewMemberWriter {
    fun save(entity: CrewMemberEntity): CrewMemberEntity
    fun delete(entity: CrewMemberEntity)
}

interface CrewPostReader {
    fun findByCrewId(crewId: Long): List<CrewPostEntity>
}

interface CrewPostWriter {
    fun save(entity: CrewPostEntity): CrewPostEntity
}
