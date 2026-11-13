package backend.team.ahachul_backend.api.openchat.adapter.web.out

import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatMessageReader
import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatMessageWriter
import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatRoomReader
import backend.team.ahachul_backend.api.openchat.application.port.out.OpenChatRoomWriter
import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatMessageEntity
import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatRoomEntity
import backend.team.ahachul_backend.api.openchat.domain.model.OpenChatRoomType
import org.springframework.data.domain.Pageable
import org.springframework.stereotype.Component

@Component
class OpenChatPersistence(
    private val openChatRoomRepository: OpenChatRoomRepository,
    private val openChatMessageRepository: OpenChatMessageRepository,
) : OpenChatRoomReader, OpenChatRoomWriter, OpenChatMessageReader, OpenChatMessageWriter {

    override fun findById(id: Long): OpenChatRoomEntity? {
        return openChatRoomRepository.findById(id).orElse(null)
    }

    override fun findBySubwayLineId(subwayLineId: Long): OpenChatRoomEntity? {
        return openChatRoomRepository.findByRoomTypeAndSubwayLineId(
            OpenChatRoomType.SUBWAY_LINE,
            subwayLineId,
        )
    }

    override fun findByStationId(stationId: Long): OpenChatRoomEntity? {
        return openChatRoomRepository.findByRoomTypeAndStationId(
            OpenChatRoomType.STATION,
            stationId,
        )
    }

    override fun save(entity: OpenChatRoomEntity): OpenChatRoomEntity {
        return openChatRoomRepository.save(entity)
    }

    override fun findMessages(chatRoomId: Long, cursorId: Long?, pageable: Pageable): List<OpenChatMessageEntity> {
        return if (cursorId == null) {
            openChatMessageRepository.findByChatRoomIdOrderByIdDesc(chatRoomId, pageable)
        } else {
            openChatMessageRepository.findByChatRoomIdAndIdLessThanOrderByIdDesc(chatRoomId, cursorId, pageable)
        }
    }

    override fun save(entity: OpenChatMessageEntity): OpenChatMessageEntity {
        return openChatMessageRepository.save(entity)
    }
}
