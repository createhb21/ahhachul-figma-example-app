package backend.team.ahachul_backend.api.openchat.application.port.`in`

import backend.team.ahachul_backend.api.openchat.adapter.`in`.dto.OpenChatDto
import backend.team.ahachul_backend.api.openchat.application.port.`in`.dto.SendOpenChatMessageCommand

interface OpenChatUseCase {
    fun getOrCreateSubwayLineChatRoom(subwayLineId: Long): OpenChatDto.OpenChatRoomResponse
    fun getOrCreateStationChatRoom(stationId: Long): OpenChatDto.OpenChatRoomResponse
    fun getMessages(chatRoomId: Long, cursorId: Long?, pageSize: Int): OpenChatDto.MessageListResponse
    fun sendMessage(command: SendOpenChatMessageCommand): OpenChatDto.OpenChatMessageResponse
}
