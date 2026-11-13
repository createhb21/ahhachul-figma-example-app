package backend.team.ahachul_backend.api.crew.application.port.`in`.dto

import backend.team.ahachul_backend.api.crew.domain.model.CrewCategoryType
import backend.team.ahachul_backend.api.crew.domain.model.CrewPostType

data class CreateCrewCommand(
    val name: String,
    val description: String,
    val category: CrewCategoryType,
    val subwayLineId: Long,
    val stationId: Long,
    val maxCapacity: Int? = 30,
    val iconImageUrl: String? = null,
    val meetingSchedule: String? = null,
)

data class SearchCrewsCommand(
    val subwayLineId: Long? = null,
    val stationId: Long? = null,
    val category: CrewCategoryType? = null,
)

data class CreateCrewPostCommand(
    val crewId: Long,
    val title: String,
    val content: String,
    val postType: CrewPostType = CrewPostType.CHAT,
)
