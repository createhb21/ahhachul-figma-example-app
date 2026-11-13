package backend.team.ahachul_backend.api.openchat.application.port.out

import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatMessageEntity
import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatRoomEntity
import org.springframework.data.domain.Pageable

interface OpenChatRoomReader {
    fun findById(id: Long): OpenChatRoomEntity?
    fun findBySubwayLineId(subwayLineId: Long): OpenChatRoomEntity?
    fun findByStationId(stationId: Long): OpenChatRoomEntity?
}

interface OpenChatRoomWriter {
    fun save(entity: OpenChatRoomEntity): OpenChatRoomEntity
}

interface OpenChatMessageReader {
    fun findMessages(chatRoomId: Long, cursorId: Long?, pageable: Pageable): List<OpenChatMessageEntity>
}

interface OpenChatMessageWriter {
    fun save(entity: OpenChatMessageEntity): OpenChatMessageEntity
}
