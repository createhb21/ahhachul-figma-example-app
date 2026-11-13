package backend.team.ahachul_backend.api.openchat.adapter.web.out

import backend.team.ahachul_backend.api.openchat.domain.entity.OpenChatRoomEntity
import backend.team.ahachul_backend.api.openchat.domain.model.OpenChatRoomType
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface OpenChatRoomRepository : JpaRepository<OpenChatRoomEntity, Long> {

    @EntityGraph(attributePaths = ["subwayLine", "station"])
    fun findByRoomTypeAndSubwayLineId(
        roomType: OpenChatRoomType,
        subwayLineId: Long,
    ): OpenChatRoomEntity?

    @EntityGraph(attributePaths = ["subwayLine", "station"])
    fun findByRoomTypeAndStationId(
        roomType: OpenChatRoomType,
        stationId: Long,
    ): OpenChatRoomEntity?

    @EntityGraph(attributePaths = ["subwayLine", "station"])
    override fun findById(id: Long): java.util.Optional<OpenChatRoomEntity>
}
