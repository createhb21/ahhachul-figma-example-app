package backend.team.ahachul_backend.api.openchat.application.service

import backend.team.ahachul_backend.api.common.application.port.out.StationReader
import backend.team.ahachul_backend.api.member.application.port.out.MemberReader
import backend.team.ahachul_backend.api.openchat.adapter.`in`.dto.OpenChatDto
import backend.team.ahachul_backend.api.openchat.application.port.`in`.OpenChatUseCase
import backend.team.ahachul_backend.api.openchat.application.port.`in`.dto.SendOpenChatMessageCommand
import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatMessageReader
import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatMessageWriter
import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatRoomReader
import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatRoomWriter
import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatMessageEntity
import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatRoomEntity
import backend.team.ahachul_backend.common.exception.CommonException
import backend.team.ahachul_backend.common.persistence.SubwayLineReader
import backend.team.ahachul_backend.common.response.ResponseCode
import backend.team.ahachul_backend.common.utils.RequestUtils
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional(readOnly = true)
class OpenChatService(
    private val openChatRoomReader: OpenChatRoomReader,
    private val openChatRoomWriter: OpenChatRoomWriter,
    private val openChatMessageReader: OpenChatMessageReader,
    private val openChatMessageWriter: OpenChatMessageWriter,
    private val memberReader: MemberReader,
    private val stationReader: StationReader,
    private val subwayLineReader: SubwayLineReader,
) : OpenChatUseCase {

    @Transactional
    override fun getOrCreateSubwayLineChatRoom(subwayLineId: Long): OpenChatDto.OpenChatRoomResponse {
        val existing = openChatRoomReader.findBySubwayLineId(subwayLineId)
        if (existing != null) {
            return OpenChatDto.OpenChatRoomResponse.of(existing)
        }

        val subwayLine = subwayLineReader.getSubwayLine(subwayLineId)
        val created = openChatRoomWriter.save(OpenChatRoomEntity.ofSubwayLine(subwayLine))
        return OpenChatDto.OpenChatRoomResponse.of(created)
    }

    @Transactional
    override fun getOrCreateStationChatRoom(stationId: Long): OpenChatDto.OpenChatRoomResponse {
        val existing = openChatRoomReader.findByStationId(stationId)
        if (existing != null) {
            return OpenChatDto.OpenChatRoomResponse.of(existing)
        }

        val station = stationReader.getById(stationId)
        val created = openChatRoomWriter.save(OpenChatRoomEntity.ofStation(station))
        return OpenChatDto.OpenChatRoomResponse.of(created)
    }

    override fun getMessages(chatRoomId: Long, cursorId: Long?, pageSize: Int): OpenChatDto.MessageListResponse {
        val currentMemberId = RequestUtils.getAttribute("memberId")?.toLongOrNull()
        val chatRoom = openChatRoomReader.findById(chatRoomId)
            ?: throw CommonException(ResponseCode.OPEN_CHAT_ROOM_NOT_FOUND)

        val pageable = PageRequest.of(0, pageSize + 1)
        val messages = openChatMessageReader.findMessages(chatRoomId, cursorId, pageable)

        val hasNext = messages.size > pageSize
        val resultMessages = if (hasNext) messages.subList(0, pageSize) else messages
        val nextCursorId = resultMessages.lastOrNull()?.id

        return OpenChatDto.MessageListResponse(
            chatRoom = OpenChatDto.OpenChatRoomResponse.of(chatRoom),
            messages = resultMessages.map { OpenChatDto.OpenChatMessageResponse.of(it, currentMemberId) },
            nextCursorId = nextCursorId,
            hasNext = hasNext,
        )
    }

    @Transactional
    override fun sendMessage(command: SendOpenChatMessageCommand): OpenChatDto.OpenChatMessageResponse {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        val chatRoom = openChatRoomReader.findById(command.chatRoomId)
            ?: throw CommonException(ResponseCode.OPEN_CHAT_ROOM_NOT_FOUND)
        val member = memberReader.getMember(memberId)

        val message = openChatMessageWriter.save(
            OpenChatMessageEntity.of(
                chatRoom = chatRoom,
                member = member,
                content = command.content,
                messageType = command.messageType,
            )
        )

        return OpenChatDto.OpenChatMessageResponse.of(message, memberId)
    }
}
