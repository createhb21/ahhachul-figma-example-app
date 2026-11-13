package backend.team.ahachul_backend.api.crew.domain.entity

import backend.team.ahachul_backend.api.crew.domain.model.CrewMemberStatusType
import backend.team.ahachul_backend.api.crew.domain.model.CrewRoleType
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
@Table(name = "tb_crew_member")
class CrewMemberEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "crew_member_id")
    val id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    var crew: CrewEntity,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    var member: MemberEntity,

    @Enumerated(EnumType.STRING)
    var role: CrewRoleType = CrewRoleType.MEMBER,

    @Enumerated(EnumType.STRING)
    var status: CrewMemberStatusType = CrewMemberStatusType.APPROVED,
) : BaseEntity() {

    companion object {
        fun of(
            crew: CrewEntity,
            member: MemberEntity,
            role: CrewRoleType = CrewRoleType.MEMBER,
            status: CrewMemberStatusType = CrewMemberStatusType.APPROVED,
        ): CrewMemberEntity {
            return CrewMemberEntity(
                crew = crew,
                member = member,
                role = role,
                status = status,
            )
        }
    }

    fun approve() {
        this.status = CrewMemberStatusType.APPROVED
    }

    fun reject() {
        this.status = CrewMemberStatusType.REJECTED
    }
}
