package backend.team.ahachul_backend.api.crew.adapter.web.out

import backend.team.ahachul_backend.api.crew.domain.entity.CrewEntity
import backend.team.ahachul_backend.api.crew.domain.model.CrewCategoryType
import backend.team.ahachul_backend.api.crew.domain.model.CrewStatusType
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface CrewRepository : JpaRepository<CrewEntity, Long> {

    @EntityGraph(attributePaths = ["subwayLine", "station", "leader"])
    fun findBySubwayLineIdAndStatusOrderByCreatedAtDesc(
        subwayLineId: Long,
        status: CrewStatusType,
    ): List<CrewEntity>

    @EntityGraph(attributePaths = ["subwayLine", "station", "leader"])
    fun findByStationIdAndStatusOrderByCreatedAtDesc(
        stationId: Long,
        status: CrewStatusType,
    ): List<CrewEntity>

    @EntityGraph(attributePaths = ["subwayLine", "station", "leader"])
    fun findByCategoryAndStatusOrderByCreatedAtDesc(
        category: CrewCategoryType,
        status: CrewStatusType,
    ): List<CrewEntity>

    @EntityGraph(attributePaths = ["subwayLine", "station", "leader"])
    fun findByStatusOrderByCreatedAtDesc(
        status: CrewStatusType,
    ): List<CrewEntity>

    @EntityGraph(attributePaths = ["subwayLine", "station", "leader"])
    override fun findById(id: Long): java.util.Optional<CrewEntity>
}
