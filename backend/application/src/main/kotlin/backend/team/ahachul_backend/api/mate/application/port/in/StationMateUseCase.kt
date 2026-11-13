package backend.team.ahachul_backend.api.mate.application.port.`in`

import backend.team.ahachul_backend.api.mate.adapter.`in`.dto.StationMateDto
import backend.team.ahachul_backend.api.mate.application.port.`in`.dto.RequestMateMatchCommand
import backend.team.ahachul_backend.api.mate.application.port.`in`.dto.UpsertMateProfileCommand

interface StationMateUseCase {
    fun upsertMyProfile(command: UpsertMateProfileCommand): StationMateDto.MateProfileCard
    fun getMyProfile(): StationMateDto.MateProfileCard?
    fun getStationMates(stationId: Long): List<StationMateDto.MateProfileCard>
    fun getSubwayLineMates(subwayLineId: Long): List<StationMateDto.MateProfileCard>
    fun requestMatch(command: RequestMateMatchCommand): StationMateDto.MatchResponse
    fun acceptMatch(matchId: Long): StationMateDto.MatchResponse
    fun rejectMatch(matchId: Long): StationMateDto.MatchResponse
    fun getReceivedMatchRequests(): List<StationMateDto.MatchResponse>
    fun getSentMatchRequests(): List<StationMateDto.MatchResponse>
}
