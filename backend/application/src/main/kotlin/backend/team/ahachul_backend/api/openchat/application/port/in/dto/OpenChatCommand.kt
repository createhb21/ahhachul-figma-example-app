package backend.team.ahachul_backend.api.openchat.application.port.`in`.dto

import backend.team.ahachul_backend.api.openchat.domain.model.OpenChatMessageType

data class SendOpenChatMessageCommand(
    val chatRoomId: Long,
    val content: String,
    val messageType: OpenChatMessageType = OpenChatMessageType.TALK,
)
