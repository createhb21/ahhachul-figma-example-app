package backend.team.ahachul_backend.api.crew.application.port.`in`

import backend.team.ahachul_backend.api.crew.adapter.`in`.dto.CrewDto
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.CreateCrewCommand
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.CreateCrewPostCommand
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.SearchCrewsCommand

interface CrewUseCase {
    fun createCrew(command: CreateCrewCommand): CrewDto.CrewCard
    fun searchCrews(command: SearchCrewsCommand): List<CrewDto.CrewCard>
    fun getCrewDetail(crewId: Long): CrewDto.CrewDetailResponse
    fun joinCrew(crewId: Long): CrewDto.JoinCrewResponse
    fun leaveCrew(crewId: Long): CrewDto.LeaveCrewResponse
    fun getCrewPosts(crewId: Long): List<CrewDto.CrewPostItem>
    fun createCrewPost(command: CreateCrewPostCommand): CrewDto.CrewPostItem
}
