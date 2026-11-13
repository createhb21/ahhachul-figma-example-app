package backend.team.ahachul_backend.api.mate.application.port.out

import backend.team.ahachul_backend.api.mate.domain.entity.StationMateMatchEntity
import backend.team.ahachul_backend.api.mate.domain.entity.StationMateProfileEntity
import backend.team.ahachul_backend.api.mate.domain.model.MateMatchStatusType

interface StationMateProfileReader {
    fun findByMemberId(memberId: Long): StationMateProfileEntity?
    fun findByStationId(stationId: Long): List<StationMateProfileEntity>
    fun findBySubwayLineId(subwayLineId: Long): List<StationMateProfileEntity>
}

interface StationMateProfileWriter {
    fun save(entity: StationMateProfileEntity): StationMateProfileEntity
}

interface StationMateMatchReader {
    fun findById(id: Long): StationMateMatchEntity?
    fun existsPendingMatch(requesterId: Long, targetId: Long): Boolean
    fun findReceivedRequests(targetId: Long): List<StationMateMatchEntity>
    fun findSentRequests(requesterId: Long): List<StationMateMatchEntity>
}

interface StationMateMatchWriter {
    fun save(entity: StationMateMatchEntity): StationMateMatchEntity
}
