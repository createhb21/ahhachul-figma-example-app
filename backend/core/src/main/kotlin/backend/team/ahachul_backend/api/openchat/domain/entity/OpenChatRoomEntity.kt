package backend.team.ahachul_backend.api.openchat.domain.entity

import backend.team.ahachul_backend.api.common.domain.entity.StationEntity
import backend.team.ahachul_backend.api.openchat.domain.model.OpenChatRoomType
import backend.team.ahachul_backend.common.domain.entity.BaseEntity
import backend.team.ahachul_backend.common.domain.entity.SubwayLineEntity
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.EnumType
import jakarta.persistence.Enumerated
import jakarta.persistence.FetchType
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "tb_open_chat_room")
class OpenChatRoomEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "open_chat_room_id")
    val id: Long = 0,

    @Enumerated(EnumType.STRING)
    var roomType: OpenChatRoomType,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subway_line_id")
    var subwayLine: SubwayLineEntity? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "station_id")
    var station: StationEntity? = null,

    var title: String,

    var activeUserCount: Int = 0,
) : BaseEntity() {

    fun increaseUserCount() {
        this.activeUserCount += 1
    }

    fun decreaseUserCount() {
        if (this.activeUserCount > 0) {
            this.activeUserCount -= 1
        }
    }

    companion object {
        fun ofSubwayLine(subwayLine: SubwayLineEntity): OpenChatRoomEntity {
            return OpenChatRoomEntity(
                roomType = OpenChatRoomType.SUBWAY_LINE,
                subwayLine = subwayLine,
                station = null,
                title = "${subwayLine.name} 실시간 광장 톡",
            )
        }

        fun ofStation(station: StationEntity, subwayLine: SubwayLineEntity? = null): OpenChatRoomEntity {
            return OpenChatRoomEntity(
                roomType = OpenChatRoomType.STATION,
                subwayLine = subwayLine,
                station = station,
                title = "${station.name} 실시간 오픈톡",
            )
        }
    }
}
