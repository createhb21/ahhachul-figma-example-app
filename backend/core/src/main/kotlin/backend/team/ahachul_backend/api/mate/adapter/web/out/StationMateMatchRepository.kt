package backend.team.ahachul_backend.api.mate.adapter.web.out

import backend.team.ahachul_backend.api.mate.domain.entity.StationMateMatchEntity
import backend.team.ahachul_backend.api.mate.domain.model.MateMatchStatusType
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface StationMateMatchRepository : JpaRepository<StationMateMatchEntity, Long> {

    fun existsByRequesterIdAndTargetIdAndStatus(
        requesterId: Long,
        targetId: Long,
        status: MateMatchStatusType,
    ): Boolean

    @EntityGraph(attributePaths = ["requester", "target", "station"])
    fun findByTargetIdAndStatusOrderByCreatedAtDesc(
        targetId: Long,
        status: MateMatchStatusType,
    ): List<StationMateMatchEntity>

    @EntityGraph(attributePaths = ["requester", "target", "station"])
    fun findByRequesterIdOrderByCreatedAtDesc(
        requesterId: Long,
    ): List<StationMateMatchEntity>

    @EntityGraph(attributePaths = ["requester", "target", "station"])
    override fun findById(id: Long): java.util.Optional<StationMateMatchEntity>
}
