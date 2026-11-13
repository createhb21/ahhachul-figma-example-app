package backend.team.ahachul_backend.api.mate.adapter.`in`

import backend.team.ahachul_backend.api.mate.adapter.`in`.dto.StationMateDto
import backend.team.ahachul_backend.api.mate.application.port.`in`.StationMateUseCase
import backend.team.ahachul_backend.common.annotation.Authentication
import backend.team.ahachul_backend.common.response.CommonResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v2/mates")
class StationMateController(
    private val stationMateUseCase: StationMateUseCase,
) {

    @Authentication
    @PostMapping("/profile")
    fun upsertMyProfile(
        @RequestBody request: StationMateDto.UpsertProfileRequest,
    ): CommonResponse<StationMateDto.MateProfileCard> {
        return CommonResponse.success(stationMateUseCase.upsertMyProfile(request.toCommand()))
    }

    @Authentication
    @GetMapping("/profile/me")
    fun getMyProfile(): CommonResponse<StationMateDto.MateProfileCard?> {
        return CommonResponse.success(stationMateUseCase.getMyProfile())
    }

    @GetMapping("/stations/{stationId}")
    fun getStationMates(
        @PathVariable stationId: Long,
    ): CommonResponse<List<StationMateDto.MateProfileCard>> {
        return CommonResponse.success(stationMateUseCase.getStationMates(stationId))
    }

    @GetMapping("/subway-lines/{subwayLineId}")
    fun getSubwayLineMates(
        @PathVariable subwayLineId: Long,
    ): CommonResponse<List<StationMateDto.MateProfileCard>> {
        return CommonResponse.success(stationMateUseCase.getSubwayLineMates(subwayLineId))
    }

    @Authentication
    @PostMapping("/{targetMemberId}/request")
    fun requestMatch(
        @PathVariable targetMemberId: Long,
        @RequestBody request: StationMateDto.RequestMatchRequest,
    ): CommonResponse<StationMateDto.MatchResponse> {
        return CommonResponse.success(stationMateUseCase.requestMatch(request.toCommand(targetMemberId)))
    }

    @Authentication
    @PostMapping("/requests/{matchId}/accept")
    fun acceptMatch(
        @PathVariable matchId: Long,
    ): CommonResponse<StationMateDto.MatchResponse> {
        return CommonResponse.success(stationMateUseCase.acceptMatch(matchId))
    }

    @Authentication
    @PostMapping("/requests/{matchId}/reject")
    fun rejectMatch(
        @PathVariable matchId: Long,
    ): CommonResponse<StationMateDto.MatchResponse> {
        return CommonResponse.success(stationMateUseCase.rejectMatch(matchId))
    }

    @Authentication
    @GetMapping("/requests/received")
    fun getReceivedMatchRequests(): CommonResponse<List<StationMateDto.MatchResponse>> {
        return CommonResponse.success(stationMateUseCase.getReceivedMatchRequests())
    }

    @Authentication
    @GetMapping("/requests/sent")
    fun getSentMatchRequests(): CommonResponse<List<StationMateDto.MatchResponse>> {
        return CommonResponse.success(stationMateUseCase.getSentMatchRequests())
    }
}
