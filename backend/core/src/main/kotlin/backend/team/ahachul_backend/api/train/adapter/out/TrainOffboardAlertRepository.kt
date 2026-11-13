package backend.team.ahachul_backend.api.train.adapter.out

import backend.team.ahachul_backend.api.train.domain.entity.TrainAlertStatusType
import backend.team.ahachul_backend.api.train.domain.entity.TrainOffboardAlertEntity
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface TrainOffboardAlertRepository : JpaRepository<TrainOffboardAlertEntity, Long> {

    @EntityGraph(attributePaths = ["member", "subwayLine", "destinationStation"])
    fun findByMemberIdAndStatus(memberId: Long, status: TrainAlertStatusType): List<TrainOffboardAlertEntity>

    @EntityGraph(attributePaths = ["member", "subwayLine", "destinationStation"])
    fun findByStatus(status: TrainAlertStatusType): List<TrainOffboardAlertEntity>

    fun existsByMemberIdAndTrainNoAndStatus(
        memberId: Long,
        trainNo: String,
        status: TrainAlertStatusType,
    ): Boolean
}
