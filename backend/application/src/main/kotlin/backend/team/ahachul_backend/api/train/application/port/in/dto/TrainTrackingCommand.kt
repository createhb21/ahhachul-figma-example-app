package backend.team.ahachul_backend.api.train.application.port.`in`.dto

data class TrackTrainLocationCommand(
    val trainNo: String,
    val subwayLineName: String,
    val destinationStationId: Long? = null,
)

data class CreateOffboardAlertCommand(
    val trainNo: String,
    val subwayLineId: Long,
    val destinationStationId: Long,
    val alertBeforeStationCount: Int = 1,
)
