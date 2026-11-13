package backend.team.ahachul_backend.api.crew.adapter.`in`

import backend.team.ahachul_backend.api.crew.adapter.`in`.dto.CrewDto
import backend.team.ahachul_backend.api.crew.application.port.`in`.CrewUseCase
import backend.team.ahachul_backend.common.annotation.Authentication
import backend.team.ahachul_backend.common.response.CommonResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v2/crews")
class CrewController(
    private val crewUseCase: CrewUseCase,
) {

    @Authentication
    @PostMapping
    fun createCrew(
        @RequestBody request: CrewDto.CreateCrewRequest,
    ): CommonResponse<CrewDto.CrewCard> {
        return CommonResponse.success(crewUseCase.createCrew(request.toCommand()))
    }

    @GetMapping
    fun searchCrews(
        request: CrewDto.SearchCrewsRequest,
    ): CommonResponse<List<CrewDto.CrewCard>> {
        return CommonResponse.success(crewUseCase.searchCrews(request.toCommand()))
    }

    @GetMapping("/{crewId}")
    fun getCrewDetail(
        @PathVariable crewId: Long,
    ): CommonResponse<CrewDto.CrewDetailResponse> {
        return CommonResponse.success(crewUseCase.getCrewDetail(crewId))
    }

    @Authentication
    @PostMapping("/{crewId}/join")
    fun joinCrew(
        @PathVariable crewId: Long,
    ): CommonResponse<CrewDto.JoinCrewResponse> {
        return CommonResponse.success(crewUseCase.joinCrew(crewId))
    }

    @Authentication
    @PostMapping("/{crewId}/leave")
    fun leaveCrew(
        @PathVariable crewId: Long,
    ): CommonResponse<CrewDto.LeaveCrewResponse> {
        return CommonResponse.success(crewUseCase.leaveCrew(crewId))
    }

    @Authentication
    @GetMapping("/{crewId}/posts")
    fun getCrewPosts(
        @PathVariable crewId: Long,
    ): CommonResponse<List<CrewDto.CrewPostItem>> {
        return CommonResponse.success(crewUseCase.getCrewPosts(crewId))
    }

    @Authentication
    @PostMapping("/{crewId}/posts")
    fun createCrewPost(
        @PathVariable crewId: Long,
        @RequestBody request: CrewDto.CreateCrewPostRequest,
    ): CommonResponse<CrewDto.CrewPostItem> {
        return CommonResponse.success(crewUseCase.createCrewPost(request.toCommand(crewId)))
    }
}
