package backend.team.ahachul_backend.api.crew.adapter.web.out

import backend.team.ahachul_backend.api.crew.application.port.out.CrewMemberReader
import backend.team.ahachul_backend.api.crew.application.port.out.CrewMemberWriter
import backend.team.ahachul_backend.api.crew.application.port.out.CrewPostReader
import backend.team.ahachul_backend.api.crew.application.port.out.CrewPostWriter
import backend.team.ahachul_backend.api.crew.application.port.out.CrewReader
import backend.team.ahachul_backend.api.crew.application.port.out.CrewWriter
import backend.team.ahachul_backend.api.crew.domain.entity.CrewEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewMemberEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewPostEntity
import backend.team.ahachul_backend.api.crew.domain.model.CrewCategoryType
import backend.team.ahachul_backend.api.crew.domain.model.CrewMemberStatusType
import backend.team.ahachul_backend.api.crew.domain.model.CrewStatusType
import org.springframework.stereotype.Component

@Component
class CrewPersistence(
    private val crewRepository: CrewRepository,
    private val crewMemberRepository: CrewMemberRepository,
    private val crewPostRepository: CrewPostRepository,
) : CrewReader, CrewWriter, CrewMemberReader, CrewMemberWriter, CrewPostReader, CrewPostWriter {

    override fun findById(id: Long): CrewEntity? {
        return crewRepository.findById(id).orElse(null)
    }

    override fun findBySubwayLineId(subwayLineId: Long): List<CrewEntity> {
        return crewRepository.findBySubwayLineIdAndStatusOrderByCreatedAtDesc(
            subwayLineId = subwayLineId,
            status = CrewStatusType.ACTIVE,
        )
    }

    override fun findByStationId(stationId: Long): List<CrewEntity> {
        return crewRepository.findByStationIdAndStatusOrderByCreatedAtDesc(
            stationId = stationId,
            status = CrewStatusType.ACTIVE,
        )
    }

    override fun findByCategory(category: CrewCategoryType): List<CrewEntity> {
        return crewRepository.findByCategoryAndStatusOrderByCreatedAtDesc(
            category = category,
            status = CrewStatusType.ACTIVE,
        )
    }

    override fun findAllActive(): List<CrewEntity> {
        return crewRepository.findByStatusOrderByCreatedAtDesc(CrewStatusType.ACTIVE)
    }

    override fun save(entity: CrewEntity): CrewEntity {
        return crewRepository.save(entity)
    }

    override fun findApprovedMembers(crewId: Long): List<CrewMemberEntity> {
        return crewMemberRepository.findByCrewIdAndStatus(crewId, CrewMemberStatusType.APPROVED)
    }

    override fun findByCrewAndMember(crewId: Long, memberId: Long): CrewMemberEntity? {
        return crewMemberRepository.findByCrewIdAndMemberId(crewId, memberId)
    }

    override fun isMember(crewId: Long, memberId: Long): Boolean {
        return crewMemberRepository.existsByCrewIdAndMemberIdAndStatus(
            crewId = crewId,
            memberId = memberId,
            status = CrewMemberStatusType.APPROVED,
        )
    }

    override fun findMyCrews(memberId: Long): List<CrewMemberEntity> {
        return crewMemberRepository.findByMemberIdAndStatus(memberId, CrewMemberStatusType.APPROVED)
    }

    override fun save(entity: CrewMemberEntity): CrewMemberEntity {
        return crewMemberRepository.save(entity)
    }

    override fun delete(entity: CrewMemberEntity) {
        crewMemberRepository.delete(entity)
    }

    override fun findByCrewId(crewId: Long): List<CrewPostEntity> {
        return crewPostRepository.findByCrewIdOrderByCreatedAtDesc(crewId)
    }

    override fun save(entity: CrewPostEntity): CrewPostEntity {
        return crewPostRepository.save(entity)
    }
}
