package backend.team.ahachul_backend.api.openchat.adapter.web.out

import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatMessageEntity
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface OpenChatMessageRepository : JpaRepository<OpenChatMessageEntity, Long> {

    @EntityGraph(attributePaths = ["member"])
    fun findByChatRoomIdOrderByIdDesc(chatRoomId: Long, pageable: Pageable): List<OpenChatMessageEntity>

    @EntityGraph(attributePaths = ["member"])
    fun findByChatRoomIdAndIdLessThanOrderByIdDesc(
        chatRoomId: Long,
        cursorId: Long,
        pageable: Pageable,
    ): List<OpenChatMessageEntity>
}
