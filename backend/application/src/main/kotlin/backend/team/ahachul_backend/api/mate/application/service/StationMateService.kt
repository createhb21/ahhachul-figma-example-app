package backend.team.ahachul_backend.api.mate.application.service

import backend.team.ahachul_backend.api.common.application.port.out.StationReader
import backend.team.ahachul_backend.api.mate.adapter.`in`.dto.StationMateDto
import backend.team.ahachul_backend.api.mate.application.port.`in`.StationMateUseCase
import backend.team.ahachul_backend.api.mate.application.port.`in`.dto.RequestMateMatchCommand
import backend.team.ahachul_backend.api.mate.application.port.`in`.dto.UpsertMateProfileCommand
import backend.team.ahachul_backend.api.mate.application.port.out.StationMateMatchReader
import backend.team.ahachul_backend.api.mate.application.port.out.StationMateMatchWriter
import backend.team.ahachul_backend.api.mate.application.port.out.StationMateProfileReader
import backend.team.ahachul_backend.api.mate.application.port.out.StationMateProfileWriter
import backend.team.ahachul_backend.api.mate.domain.entity.StationMateMatchEntity
import backend.team.ahachul_backend.api.mate.domain.entity.StationMateProfileEntity
import backend.team.ahachul_backend.api.member.application.port.out.MemberReader
import backend.team.ahachul_backend.common.exception.CommonException
import backend.team.ahachul_backend.common.persistence.SubwayLineReader
import backend.team.ahachul_backend.common.response.ResponseCode
import backend.team.ahachul_backend.common.utils.RequestUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class StationMateService(
    private val stationMateProfileReader: StationMateProfileReader,
    private val stationMateProfileWriter: StationMateProfileWriter,
    private val stationMateMatchReader: StationMateMatchReader,
    private val stationMateMatchWriter: StationMateMatchWriter,
    private val memberReader: MemberReader,
    private val stationReader: StationReader,
    private val subwayLineReader: SubwayLineReader,
) : StationMateUseCase {

    @Transactional
    override fun upsertMyProfile(command: UpsertMateProfileCommand): StationMateDto.MateProfileCard {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val member = memberReader.getMember(memberId)
        val station = stationReader.getById(command.stationId)
        val subwayLine = subwayLineReader.getSubwayLine(command.subwayLineId)

        val existing = stationMateProfileReader.findByMemberId(memberId)
        val saved = if (existing != null) {
            existing.update(
                station = station,
                subwayLine = subwayLine,
                commuteTimeRange = command.commuteTimeRange,
                bio = command.bio,
                mbti = command.mbti,
                interests = command.interests,
                status = command.status,
            )
            stationMateProfileWriter.save(existing)
        } else {
            stationMateProfileWriter.save(
                StationMateProfileEntity.of(
                    member = member,
                    station = station,
                    subwayLine = subwayLine,
                    commuteTimeRange = command.commuteTimeRange,
                    bio = command.bio,
                    mbti = command.mbti,
                    interests = command.interests,
                )
            )
        }

        return StationMateDto.MateProfileCard.of(saved, memberId)
    }

    override fun getMyProfile(): StationMateDto.MateProfileCard? {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val profile = stationMateProfileReader.findByMemberId(memberId) ?: return null
        return StationMateDto.MateProfileCard.of(profile, memberId)
    }

    override fun getStationMates(stationId: Long): List<StationMateDto.MateProfileCard> {
        val memberId = RequestUtils.getAttribute("memberId")?.toLongOrNull()
        return stationMateProfileReader.findByStationId(stationId)
            .map { StationMateDto.MateProfileCard.of(it, memberId) }
    }

    override fun getSubwayLineMates(subwayLineId: Long): List<StationMateDto.MateProfileCard> {
        val memberId = RequestUtils.getAttribute("memberId")?.toLongOrNull()
        return stationMateProfileReader.findBySubwayLineId(subwayLineId)
            .map { StationMateDto.MateProfileCard.of(it, memberId) }
    }

    @Transactional
    override fun requestMatch(command: RequestMateMatchCommand): StationMateDto.MatchResponse {
        val requesterId = RequestUtils.getAttribute("memberId")!!.toLong()
        if (requesterId == command.targetMemberId) {
            throw CommonException(ResponseCode.MATE_REQUEST_SELF_FORBIDDEN)
        }

        if (stationMateMatchReader.existsPendingMatch(requesterId, command.targetMemberId)) {
            throw CommonException(ResponseCode.MATE_REQUEST_ALREADY_EXISTS)
        }

        val requester = memberReader.getMember(requesterId)
        val target = memberReader.getMember(command.targetMemberId)
        val station = stationReader.getById(command.stationId)

        val match = stationMateMatchWriter.save(
            StationMateMatchEntity.of(
                requester = requester,
                target = target,
                station = station,
                message = command.message,
            )
        )

        return StationMateDto.MatchResponse.of(match)
    }

    @Transactional
    override fun acceptMatch(matchId: Long): StationMateDto.MatchResponse {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val match = stationMateMatchReader.findById(matchId)
            ?: throw CommonException(ResponseCode.MATE_REQUEST_NOT_FOUND)

        if (match.target.id != memberId) {
            throw CommonException(ResponseCode.MATE_REQUEST_FORBIDDEN)
        }

        match.accept()
        return StationMateDto.MatchResponse.of(stationMateMatchWriter.save(match))
    }

    @Transactional
    override fun rejectMatch(matchId: Long): StationMateDto.MatchResponse {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val match = stationMateMatchReader.findById(matchId)
            ?: throw CommonException(ResponseCode.MATE_REQUEST_NOT_FOUND)

        if (match.target.id != memberId) {
            throw CommonException(ResponseCode.MATE_REQUEST_FORBIDDEN)
        }

        match.reject()
        return StationMateDto.MatchResponse.of(stationMateMatchWriter.save(match))
    }

    override fun getReceivedMatchRequests(): List<StationMateDto.MatchResponse> {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        return stationMateMatchReader.findReceivedRequests(memberId).map { StationMateDto.MatchResponse.of(it) }
    }

    override fun getSentMatchRequests(): List<StationMateDto.MatchResponse> {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        return stationMateMatchReader.findSentRequests(memberId).map { StationMateDto.MatchResponse.of(it) }
    }
}
