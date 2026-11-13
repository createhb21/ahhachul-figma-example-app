package backend.team.ahachul_backend.api.train.adapter.out

import backend.team.ahachul_backend.api.train.application.port.out.TrainOffboardAlertReader
import backend.team.ahachul_backend.api.train.application.port.out.TrainOffboardAlertWriter
import backend.team.ahachul_backend.api.train.domain.entity.TrainAlertStatusType
import backend.team.ahachul_backend.api.train.domain.entity.TrainOffboardAlertEntity
import org.springframework.stereotype.Component

@Component
class TrainOffboardAlertPersistence(
    private val trainOffboardAlertRepository: TrainOffboardAlertRepository,
) : TrainOffboardAlertReader, TrainOffboardAlertWriter {

    override fun findById(id: Long): TrainOffboardAlertEntity? {
        return trainOffboardAlertRepository.findById(id).orElse(null)
    }

    override fun findMyActiveAlerts(memberId: Long): List<TrainOffboardAlertEntity> {
        return trainOffboardAlertRepository.findByMemberIdAndStatus(memberId, TrainAlertStatusType.ACTIVE)
    }

    override fun existsActiveAlert(memberId: Long, trainNo: String): Boolean {
        return trainOffboardAlertRepository.existsByMemberIdAndTrainNoAndStatus(
            memberId = memberId,
            trainNo = trainNo,
            status = TrainAlertStatusType.ACTIVE,
        )
    }

    override fun save(entity: TrainOffboardAlertEntity): TrainOffboardAlertEntity {
        return trainOffboardAlertRepository.save(entity)
    }
}
