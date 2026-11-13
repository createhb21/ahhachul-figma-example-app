package backend.team.ahachul_backend.api.mate.adapter.web.out

import backend.team.ahachul_backend.api.mate.domain.entity.StationMateProfileEntity
import backend.team.ahachul_backend.api.mate.domain.model.MateProfileStatusType
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface StationMateProfileRepository : JpaRepository<StationMateProfileEntity, Long> {

    @EntityGraph(attributePaths = ["member", "station", "subwayLine"])
    fun findByMemberId(memberId: Long): StationMateProfileEntity?

    @EntityGraph(attributePaths = ["member", "station", "subwayLine"])
    fun findByStationIdAndStatusOrderByCreatedAtDesc(
        stationId: Long,
        status: MateProfileStatusType,
    ): List<StationMateProfileEntity>

    @EntityGraph(attributePaths = ["member", "station", "subwayLine"])
    fun findBySubwayLineIdAndStatusOrderByCreatedAtDesc(
        subwayLineId: Long,
        status: MateProfileStatusType,
    ): List<StationMateProfileEntity>
}
