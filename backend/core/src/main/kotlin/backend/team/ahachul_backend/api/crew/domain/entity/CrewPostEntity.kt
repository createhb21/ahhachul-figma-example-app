package backend.team.ahachul_backend.api.crew.domain.entity

import backend.team.ahachul_backend.api.crew.domain.model.CrewPostType
import backend.team.ahachul_backend.api.member.domain.entity.MemberEntity
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
@Table(name = "tb_crew_post")
class CrewPostEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_post_id")
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    var crew: CrewEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    var member: MemberEntity,

    var title: String,

    @Column(columnDefinition = "TEXT")
    var content: String,

    @Enumerated(EnumType.STRING)
    var postType: CrewPostType = CrewPostType.CHAT,
) : BaseEntity() {

    companion object {
        fun of(
            crew: CrewEntity,
            member: MemberEntity,
            title: String,
            content: String,
            postType: CrewPostType = CrewPostType.CHAT,
        ): CrewPostEntity {
            return CrewPostEntity(
                crew = crew,
                member = member,
                title = title,
                content = content,
                postType = postType,
            )
        }
    }
}
