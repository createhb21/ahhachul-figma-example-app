package backend.team.ahachul_backend.api.mate.adapter.web.out

import backend.team.ahachul_backend.api.mate.application.port.out.StationMateMatchReader
import backend.team.ahachul_backend.api.mate.application.port.out.StationMateMatchWriter
import backend.team.ahachul_backend.api.mate.application.port.out.StationMateProfileReader
import backend.team.ahachul_backend.api.mate.application.port.out.StationMateProfileWriter
import backend.team.ahachul_backend.api.mate.domain.entity.StationMateMatchEntity
import backend.team.ahachul_backend.api.mate.domain.entity.StationMateProfileEntity
import backend.team.ahachul_backend.api.mate.domain.model.MateMatchStatusType
import backend.team.ahachul_backend.api.mate.domain.model.MateProfileStatusType
import org.springframework.stereotype.Component

@Component
class StationMatePersistence(
    private val stationMateProfileRepository: StationMateProfileRepository,
    private val stationMateMatchRepository: StationMateMatchRepository,
) : StationMateProfileReader, StationMateProfileWriter, StationMateMatchReader, StationMateMatchWriter {

    override fun findByMemberId(memberId: Long): StationMateProfileEntity? {
        return stationMateProfileRepository.findByMemberId(memberId)
    }

    override fun findByStationId(stationId: Long): List<StationMateProfileEntity> {
        return stationMateProfileRepository.findByStationIdAndStatusOrderByCreatedAtDesc(
            stationId = stationId,
            status = MateProfileStatusType.ACTIVE,
        )
    }

    override fun findBySubwayLineId(subwayLineId: Long): List<StationMateProfileEntity> {
        return stationMateProfileRepository.findBySubwayLineIdAndStatusOrderByCreatedAtDesc(
            subwayLineId = subwayLineId,
            status = MateProfileStatusType.ACTIVE,
        )
    }

    override fun save(entity: StationMateProfileEntity): StationMateProfileEntity {
        return stationMateProfileRepository.save(entity)
    }

    override fun findById(id: Long): StationMateMatchEntity? {
        return stationMateMatchRepository.findById(id).orElse(null)
    }

    override fun existsPendingMatch(requesterId: Long, targetId: Long): Boolean {
        return stationMateMatchRepository.existsByRequesterIdAndTargetIdAndStatus(
            requesterId = requesterId,
            targetId = targetId,
            status = MateMatchStatusType.PENDING,
        )
    }

    override fun findReceivedRequests(targetId: Long): List<StationMateMatchEntity> {
        return stationMateMatchRepository.findByTargetIdAndStatusOrderByCreatedAtDesc(
            targetId = targetId,
            status = MateMatchStatusType.PENDING,
        )
    }

    override fun findSentRequests(requesterId: Long): List<StationMateMatchEntity> {
        return stationMateMatchRepository.findByRequesterIdOrderByCreatedAtDesc(requesterId)
    }

    override fun save(entity: StationMateMatchEntity): StationMateMatchEntity {
        return stationMateMatchRepository.save(entity)
    }
}
