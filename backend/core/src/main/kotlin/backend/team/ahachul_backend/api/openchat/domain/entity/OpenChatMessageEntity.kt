package backend.team.ahachul_backend.api.openchat.domain.entity

import backend.team.ahachul_backend.api.member.domain.entity.MemberEntity
import backend.team.ahachul_backend.api.openchat.domain.model.OpenChatMessageType
import backend.team.ahachul_backend.common.domain.entity.BaseEntity
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
@Table(name = "tb_open_chat_message")
class OpenChatMessageEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "open_chat_message_id")
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "open_chat_room_id")
    var chatRoom: OpenChatRoomEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    var member: MemberEntity,

    @Column(columnDefinition = "TEXT")
    var content: String,

    @Enumerated(EnumType.STRING)
    var messageType: OpenChatMessageType = OpenChatMessageType.TALK,
) : BaseEntity() {

    companion object {
        fun of(
            chatRoom: OpenChatRoomEntity,
            member: MemberEntity,
            content: String,
            messageType: OpenChatMessageType = OpenChatMessageType.TALK,
        ): OpenChatMessageEntity {
            return OpenChatMessageEntity(
                chatRoom = chatRoom,
                member = member,
                content = content,
                messageType = messageType,
            )
        }
    }
}
