package backend.team.ahachul_backend.api.train.adapter.`in`.dto

import backend.team.ahachul_backend.api.train.application.port.`in`.dto.CreateOffboardAlertCommand
import backend.team.ahachul_backend.api.train.application.port.`in`.dto.TrackTrainLocationCommand
import backend.team.ahachul_backend.api.train.domain.entity.TrainOffboardAlertEntity
import java.time.format.DateTimeFormatter

class TrainTrackingDto {

    data class TrackTrainRequest(
        val trainNo: String,
        val subwayLineName: String,
        val destinationStationId: Long? = null,
    ) {
        fun toCommand(): TrackTrainLocationCommand {
            return TrackTrainLocationCommand(
                trainNo = trainNo,
                subwayLineName = subwayLineName,
                destinationStationId = destinationStationId,
            )
        }
    }

    data class TrainLocationResponse(
        val trainNo: String,
        val subwayLineName: String,
        val currentStationName: String,
        val destinationDirection: String,
        val trainStatus: String, // 0: 진입, 1: 도착, 2: 출발, 3: 전역출발
        val trainStatusText: String,
        val destinationStationName: String?,
        val remainingStationCount: Int?,
        val estimatedMinutesRemaining: Int?,
        val isOffboardAlertTriggered: Boolean,
    )

    data class CreateOffboardAlertRequest(
        val trainNo: String,
        val subwayLineId: Long,
        val destinationStationId: Long,
        val alertBeforeStationCount: Int = 1,
    ) {
        fun toCommand(): CreateOffboardAlertCommand {
            return CreateOffboardAlertCommand(
                trainNo = trainNo,
                subwayLineId = subwayLineId,
                destinationStationId = destinationStationId,
                alertBeforeStationCount = alertBeforeStationCount,
            )
        }
    }

    data class OffboardAlertResponse(
        val alertId: Long,
        val trainNo: String,
        val subwayLineName: String,
        val destinationStationName: String,
        val alertBeforeStationCount: Int,
        val status: String,
        val createdAt: String,
    ) {
        companion object {
            fun of(entity: TrainOffboardAlertEntity): OffboardAlertResponse {
                return OffboardAlertResponse(
                    alertId = entity.id,
                    trainNo = entity.trainNo,
                    subwayLineName = entity.subwayLine.name,
                    destinationStationName = entity.destinationStation.name,
                    alertBeforeStationCount = entity.alertBeforeStationCount,
                    status = entity.status.name,
                    createdAt = entity.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                )
            }
        }
    }
}
