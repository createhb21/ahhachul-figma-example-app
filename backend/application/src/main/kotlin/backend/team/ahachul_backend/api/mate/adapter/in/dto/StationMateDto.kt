package backend.team.ahachul_backend.api.mate.adapter.`in`.dto

import backend.team.ahachul_backend.api.mate.application.port.`in`.dto.RequestMateMatchCommand
import backend.team.ahachul_backend.api.mate.application.port.`in`.dto.UpsertMateProfileCommand
import backend.team.ahachul_backend.api.mate.domain.entity.StationMateMatchEntity
import backend.team.ahachul_backend.api.mate.domain.entity.StationMateProfileEntity
import backend.team.ahachul_backend.api.mate.domain.model.MateProfileStatusType
import java.time.format.DateTimeFormatter

class StationMateDto {

    data class UpsertProfileRequest(
        val stationId: Long,
        val subwayLineId: Long,
        val commuteTimeRange: String,
        val bio: String,
        val mbti: String? = null,
        val interests: String? = null,
        val status: MateProfileStatusType = MateProfileStatusType.ACTIVE,
    ) {
        fun toCommand(): UpsertMateProfileCommand {
            return UpsertMateProfileCommand(
                stationId = stationId,
                subwayLineId = subwayLineId,
                commuteTimeRange = commuteTimeRange,
                bio = bio,
                mbti = mbti,
                interests = interests,
                status = status,
            )
        }
    }

    data class MateProfileCard(
        val profileId: Long,
        val memberId: Long,
        val nickname: String,
        val stationId: Long,
        val stationName: String,
        val subwayLineId: Long,
        val subwayLineName: String,
        val commuteTimeRange: String,
        val bio: String,
        val mbti: String?,
        val interests: String?,
        val isMe: Boolean = false,
    ) {
        companion object {
            fun of(entity: StationMateProfileEntity, currentMemberId: Long? = null): MateProfileCard {
                return MateProfileCard(
                    profileId = entity.id,
                    memberId = entity.member.id,
                    nickname = entity.member.nickname ?: "메이트",
                    stationId = entity.station.id,
                    stationName = entity.station.name,
                    subwayLineId = entity.subwayLine.id,
                    subwayLineName = entity.subwayLine.name,
                    commuteTimeRange = entity.commuteTimeRange,
                    bio = entity.bio,
                    mbti = entity.mbti,
                    interests = entity.interests,
                    isMe = currentMemberId != null && entity.member.id == currentMemberId,
                )
            }
        }
    }

    data class RequestMatchRequest(
        val stationId: Long,
        val message: String,
    ) {
        fun toCommand(targetMemberId: Long): RequestMateMatchCommand {
            return RequestMateMatchCommand(
                targetMemberId = targetMemberId,
                stationId = stationId,
                message = message,
            )
        }
    }

    data class MatchResponse(
        val matchId: Long,
        val requesterNickname: String,
        val targetNickname: String,
        val stationName: String,
        val message: String,
        val status: String,
        val createdAt: String,
    ) {
        companion object {
            fun of(entity: StationMateMatchEntity): MatchResponse {
                return MatchResponse(
                    matchId = entity.id,
                    requesterNickname = entity.requester.nickname ?: "메이트",
                    targetNickname = entity.target.nickname ?: "메이트",
                    stationName = entity.station.name,
                    message = entity.message,
                    status = entity.status.name,
                    createdAt = entity.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                )
            }
        }
    }
}
