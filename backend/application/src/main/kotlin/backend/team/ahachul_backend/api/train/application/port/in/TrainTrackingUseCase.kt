package backend.team.ahachul_backend.api.train.application.port.`in`

import backend.team.ahachul_backend.api.train.adapter.`in`.dto.TrainTrackingDto
import backend.team.ahachul_backend.api.train.application.port.`in`.dto.CreateOffboardAlertCommand
import backend.team.ahachul_backend.api.train.application.port.`in`.dto.TrackTrainLocationCommand

interface TrainTrackingUseCase {
    fun trackTrain(command: TrackTrainLocationCommand): TrainTrackingDto.TrainLocationResponse
    fun createOffboardAlert(command: CreateOffboardAlertCommand): TrainTrackingDto.OffboardAlertResponse
    fun getMyActiveAlerts(): List<TrainTrackingDto.OffboardAlertResponse>
    fun cancelOffboardAlert(alertId: Long)
}
