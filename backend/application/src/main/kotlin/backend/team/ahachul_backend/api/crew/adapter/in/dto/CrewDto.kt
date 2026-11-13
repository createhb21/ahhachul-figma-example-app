package backend.team.ahachul_backend.api.crew.adapter.`in`.dto

import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.CreateCrewCommand
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.CreateCrewPostCommand
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.SearchCrewsCommand
import backend.team.ahachul_backend.api.crew.domain.entity.CrewEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewMemberEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewPostEntity
import backend.team.ahachul_backend.api.crew.domain.model.CrewCategoryType
import backend.team.ahachul_backend.api.crew.domain.model.CrewPostType
import java.time.format.DateTimeFormatter

class CrewDto {

    data class CreateCrewRequest(
        val name: String,
        val description: String,
        val category: CrewCategoryType,
        val subwayLineId: Long,
        val stationId: Long,
        val maxCapacity: Int? = 30,
        val iconImageUrl: String? = null,
        val meetingSchedule: String? = null,
    ) {
        fun toCommand(): CreateCrewCommand {
            return CreateCrewCommand(
                name = name,
                description = description,
                category = category,
                subwayLineId = subwayLineId,
                stationId = stationId,
                maxCapacity = maxCapacity ?: 30,
                iconImageUrl = iconImageUrl,
                meetingSchedule = meetingSchedule,
            )
        }
    }

    data class SearchCrewsRequest(
        val subwayLineId: Long? = null,
        val stationId: Long? = null,
        val category: CrewCategoryType? = null,
    ) {
        fun toCommand(): SearchCrewsCommand {
            return SearchCrewsCommand(
                subwayLineId = subwayLineId,
                stationId = stationId,
                category = category,
            )
        }
    }

    data class CrewCard(
        val crewId: Long,
        val name: String,
        val description: String,
        val category: String,
        val categoryDescription: String,
        val subwayLineId: Long,
        val subwayLineName: String,
        val stationId: Long,
        val stationName: String,
        val leaderNickname: String,
        val currentMemberCount: Int,
        val maxCapacity: Int,
        val iconImageUrl: String?,
        val meetingSchedule: String?,
        val isJoined: Boolean = false,
        val isLeader: Boolean = false,
        val createdAt: String,
    ) {
        companion object {
            fun of(entity: CrewEntity, currentMemberId: Long? = null): CrewCard {
                return CrewCard(
                    crewId = entity.id,
                    name = entity.name,
                    description = entity.description,
                    category = entity.category.name,
                    categoryDescription = entity.category.description,
                    subwayLineId = entity.subwayLine.id,
                    subwayLineName = entity.subwayLine.name,
                    stationId = entity.station.id,
                    stationName = entity.station.name,
                    leaderNickname = entity.leader.nickname ?: "크루장",
                    currentMemberCount = entity.currentMemberCount,
                    maxCapacity = entity.maxCapacity,
                    iconImageUrl = entity.iconImageUrl,
                    meetingSchedule = entity.meetingSchedule,
                    isJoined = false,
                    isLeader = currentMemberId != null && entity.leader.id == currentMemberId,
                    createdAt = entity.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                )
            }
        }
    }

    data class CrewDetailResponse(
        val crew: CrewCard,
        val members: List<CrewMemberItem>,
        val recentPosts: List<CrewPostItem>,
    )

    data class CrewMemberItem(
        val memberId: Long,
        val nickname: String,
        val role: String,
        val joinedAt: String,
    ) {
        companion object {
            fun of(entity: CrewMemberEntity): CrewMemberItem {
                return CrewMemberItem(
                    memberId = entity.member.id,
                    nickname = entity.member.nickname ?: "멤버",
                    role = entity.role.name,
                    joinedAt = entity.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                )
            }
        }
    }

    data class CreateCrewPostRequest(
        val title: String,
        val content: String,
        val postType: CrewPostType = CrewPostType.CHAT,
    ) {
        fun toCommand(crewId: Long): CreateCrewPostCommand {
            return CreateCrewPostCommand(
                crewId = crewId,
                title = title,
                content = content,
                postType = postType,
            )
        }
    }

    data class CrewPostItem(
        val postId: Long,
        val crewId: Long,
        val authorNickname: String,
        val title: String,
        val content: String,
        val postType: String,
        val createdAt: String,
    ) {
        companion object {
            fun of(entity: CrewPostEntity): CrewPostItem {
                return CrewPostItem(
                    postId = entity.id,
                    crewId = entity.crew.id,
                    authorNickname = entity.member.nickname ?: "익명",
                    title = entity.title,
                    content = entity.content,
                    postType = entity.postType.name,
                    createdAt = entity.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                )
            }
        }
    }

    data class JoinCrewResponse(
        val crewId: Long,
        val joined: Boolean,
        val message: String,
    )

    data class LeaveCrewResponse(
        val crewId: Long,
        val left: Boolean,
        val message: String,
    )
}
