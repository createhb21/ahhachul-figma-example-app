package backend.team.ahachul_backend.api.train.application.port.out

import backend.team.ahachul_backend.api.train.domain.entity.TrainAlertStatusType
import backend.team.ahachul_backend.api.train.domain.entity.TrainOffboardAlertEntity

interface TrainOffboardAlertReader {
    fun findById(id: Long): TrainOffboardAlertEntity?
    fun findMyActiveAlerts(memberId: Long): List<TrainOffboardAlertEntity>
    fun existsActiveAlert(memberId: Long, trainNo: String): Boolean
}

interface TrainOffboardAlertWriter {
    fun save(entity: TrainOffboardAlertEntity): TrainOffboardAlertEntity
}
