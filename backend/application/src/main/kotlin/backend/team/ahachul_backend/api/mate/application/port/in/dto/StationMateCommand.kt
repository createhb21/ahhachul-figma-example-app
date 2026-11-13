package backend.team.ahachul_backend.api.mate.application.port.`in`.dto

import backend.team.ahachul_backend.api.mate.domain.model.MateProfileStatusType

data class UpsertMateProfileCommand(
    val stationId: Long,
    val subwayLineId: Long,
    val commuteTimeRange: String,
    val bio: String,
    val mbti: String? = null,
    val interests: String? = null,
    val status: MateProfileStatusType = MateProfileStatusType.ACTIVE,
)

data class RequestMateMatchCommand(
    val targetMemberId: Long,
    val stationId: Long,
    val message: String,
)
