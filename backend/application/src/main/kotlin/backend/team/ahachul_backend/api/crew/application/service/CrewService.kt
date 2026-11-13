package backend.team.ahachul_backend.api.crew.application.service

import backend.team.ahachul_backend.api.common.application.port.out.StationReader
import backend.team.ahachul_backend.api.crew.adapter.`in`.dto.CrewDto
import backend.team.ahachul_backend.api.crew.application.port.`in`.CrewUseCase
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.CreateCrewCommand
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.CreateCrewPostCommand
import backend.team.ahachul_backend.api.crew.application.port.`in`.dto.SearchCrewsCommand
import backend.team.ahachul_backend.api.crew.application.port.out.CrewMemberReader
import backend.team.ahachul_backend.api.crew.application.port.out.CrewMemberWriter
import backend.team.ahachul_backend.api.crew.application.port.out.CrewPostReader
import backend.team.ahachul_backend.api.crew.application.port.out.CrewPostWriter
import backend.team.ahachul_backend.api.crew.application.port.out.CrewReader
import backend.team.ahachul_backend.api.crew.application.port.out.CrewWriter
import backend.team.ahachul_backend.api.crew.domain.entity.CrewEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewMemberEntity
import backend.team.ahachul_backend.api.crew.domain.entity.CrewPostEntity
import backend.team.ahachul_backend.api.crew.domain.model.CrewMemberStatusType
import backend.team.ahachul_backend.api.crew.domain.model.CrewRoleType
import backend.team.ahachul_backend.api.member.application.port.out.MemberReader
import backend.team.ahachul_backend.common.exception.CommonException
import backend.team.ahachul_backend.common.persistence.SubwayLineReader
import backend.team.ahachul_backend.common.response.ResponseCode
import backend.team.ahachul_backend.common.utils.RequestUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class CrewService(
    private val crewReader: CrewReader,
    private val crewWriter: CrewWriter,
    private val crewMemberReader: CrewMemberReader,
    private val crewMemberWriter: CrewMemberWriter,
    private val crewPostReader: CrewPostReader,
    private val crewPostWriter: CrewPostWriter,
    private val memberReader: MemberReader,
    private val stationReader: StationReader,
    private val subwayLineReader: SubwayLineReader,
) : CrewUseCase {

    @Transactional
    override fun createCrew(command: CreateCrewCommand): CrewDto.CrewCard {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val member = memberReader.getMember(memberId)
        val station = stationReader.getById(command.stationId)
        val subwayLine = subwayLineReader.getSubwayLine(command.subwayLineId)

        val crew = crewWriter.save(
            CrewEntity.of(
                name = command.name,
                description = command.description,
                category = command.category,
                subwayLine = subwayLine,
                station = station,
                leader = member,
                maxCapacity = command.maxCapacity ?: 30,
                iconImageUrl = command.iconImageUrl,
                meetingSchedule = command.meetingSchedule,
            )
        )

        crewMemberWriter.save(
            CrewMemberEntity.of(
                crew = crew,
                member = member,
                role = CrewRoleType.LEADER,
                status = CrewMemberStatusType.APPROVED,
            )
        )

        return CrewDto.CrewCard.of(crew, memberId).copy(isJoined = true, isLeader = true)
    }

    override fun searchCrews(command: SearchCrewsCommand): List<CrewDto.CrewCard> {
        val memberId = RequestUtils.getAttribute("memberId")?.toLongOrNull()
        val crews = when {
            command.subwayLineId != null -> crewReader.findBySubwayLineId(command.subwayLineId)
            command.stationId != null -> crewReader.findByStationId(command.stationId)
            command.category != null -> crewReader.findByCategory(command.category)
            else -> crewReader.findAllActive()
        }

        return crews.map { crew ->
            val isJoined = if (memberId != null) crewMemberReader.isMember(crew.id, memberId) else false
            CrewDto.CrewCard.of(crew, memberId).copy(isJoined = isJoined)
        }
    }

    override fun getCrewDetail(crewId: Long): CrewDto.CrewDetailResponse {
        val memberId = RequestUtils.getAttribute("memberId")?.toLongOrNull()
        val crew = crewReader.findById(crewId) ?: throw CommonException(ResponseCode.CREW_NOT_FOUND)
        val members = crewMemberReader.findApprovedMembers(crewId).map { CrewDto.CrewMemberItem.of(it) }
        val recentPosts = crewPostReader.findByCrewId(crewId).take(10).map { CrewDto.CrewPostItem.of(it) }
        val isJoined = if (memberId != null) crewMemberReader.isMember(crew.id, memberId) else false

        return CrewDto.CrewDetailResponse(
            crew = CrewDto.CrewCard.of(crew, memberId).copy(isJoined = isJoined),
            members = members,
            recentPosts = recentPosts,
        )
    }

    @Transactional
    override fun joinCrew(crewId: Long): CrewDto.JoinCrewResponse {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val crew = crewReader.findById(crewId) ?: throw CommonException(ResponseCode.CREW_NOT_FOUND)

        if (crewMemberReader.isMember(crewId, memberId)) {
            throw CommonException(ResponseCode.CREW_MEMBER_ALREADY_JOINED)
        }

        val member = memberReader.getMember(memberId)
        crew.increaseMemberCount()
        crewWriter.save(crew)

        crewMemberWriter.save(
            CrewMemberEntity.of(
                crew = crew,
                member = member,
                role = CrewRoleType.MEMBER,
                status = CrewMemberStatusType.APPROVED,
            )
        )

        return CrewDto.JoinCrewResponse(
            crewId = crewId,
            joined = true,
            message = "크루에 성공적으로 가입되었습니다.",
        )
    }

    @Transactional
    override fun leaveCrew(crewId: Long): CrewDto.LeaveCrewResponse {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val crew = crewReader.findById(crewId) ?: throw CommonException(ResponseCode.CREW_NOT_FOUND)
        val memberRecord = crewMemberReader.findByCrewAndMember(crewId, memberId)
            ?: throw CommonException(ResponseCode.CREW_NOT_FOUND)

        if (memberRecord.role == CrewRoleType.LEADER) {
            throw CommonException(ResponseCode.CREW_FORBIDDEN)
        }

        crewMemberWriter.delete(memberRecord)
        crew.decreaseMemberCount()
        crewWriter.save(crew)

        return CrewDto.LeaveCrewResponse(
            crewId = crewId,
            left = true,
            message = "크루에서 탈퇴하였습니다.",
        )
    }

    override fun getCrewPosts(crewId: Long): List<CrewDto.CrewPostItem> {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        if (!crewMemberReader.isMember(crewId, memberId)) {
            throw CommonException(ResponseCode.CREW_FORBIDDEN)
        }
        return crewPostReader.findByCrewId(crewId).map { CrewDto.CrewPostItem.of(it) }
    }

    @Transactional
    override fun createCrewPost(command: CreateCrewPostCommand): CrewDto.CrewPostItem {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val crew = crewReader.findById(command.crewId) ?: throw CommonException(ResponseCode.CREW_NOT_FOUND)
        if (!crewMemberReader.isMember(command.crewId, memberId)) {
            throw CommonException(ResponseCode.CREW_FORBIDDEN)
        }

        val member = memberReader.getMember(memberId)
        val post = crewPostWriter.save(
            CrewPostEntity.of(
                crew = crew,
                member = member,
                title = command.title,
                content = command.content,
                postType = command.postType,
            )
        )

        return CrewDto.CrewPostItem.of(post)
    }
}
