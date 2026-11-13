package backend.team.ahachul_backend.api.openchat.adapter.`in`.dto

import backend.team.ahachul_backend.api.openchat.application.port.`in`.dto.SendOpenChatMessageCommand
import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatMessageEntity
import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatRoomEntity
import backend.team.ahachul_backend.api.openchat.domain.model.OpenChatMessageType
import java.time.format.DateTimeFormatter

class OpenChatDto {

    data class OpenChatRoomResponse(
        val chatRoomId: Long,
        val roomType: String,
        val title: String,
        val subwayLineId: Long?,
        val subwayLineName: String?,
        val stationId: Long?,
        val stationName: String?,
        val activeUserCount: Int,
    ) {
        companion object {
            fun of(entity: OpenChatRoomEntity): OpenChatRoomResponse {
                return OpenChatRoomResponse(
                    chatRoomId = entity.id,
                    roomType = entity.roomType.name,
                    title = entity.title,
                    subwayLineId = entity.subwayLine?.id,
                    subwayLineName = entity.subwayLine?.name,
                    stationId = entity.station?.id,
                    stationName = entity.station?.name,
                    activeUserCount = entity.activeUserCount,
                )
            }
        }
    }

    data class SendMessageRequest(
        val content: String,
        val messageType: OpenChatMessageType = OpenChatMessageType.TALK,
    ) {
        fun toCommand(chatRoomId: Long): SendOpenChatMessageCommand {
            return SendOpenChatMessageCommand(
                chatRoomId = chatRoomId,
                content = content,
                messageType = messageType,
            )
        }
    }

    data class OpenChatMessageResponse(
        val messageId: Long,
        val chatRoomId: Long,
        val senderMemberId: Long,
        val senderNickname: String,
        val content: String,
        val messageType: String,
        val isMe: Boolean = false,
        val createdAt: String,
    ) {
        companion object {
            fun of(entity: OpenChatMessageEntity, currentMemberId: Long? = null): OpenChatMessageResponse {
                return OpenChatMessageResponse(
                    messageId = entity.id,
                    chatRoomId = entity.chatRoom.id,
                    senderMemberId = entity.member.id,
                    senderNickname = entity.member.nickname ?: "익명",
                    content = entity.content,
                    messageType = entity.messageType.name,
                    isMe = currentMemberId != null && entity.member.id == currentMemberId,
                    createdAt = entity.createdAt.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME),
                )
            }
        }
    }

    data class MessageListResponse(
        val chatRoom: OpenChatRoomResponse,
        val messages: List<OpenChatMessageResponse>,
        val nextCursorId: Long?,
        val hasNext: Boolean,
    )
}
