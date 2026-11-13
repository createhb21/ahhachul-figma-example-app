package backend.team.ahachul_backend.api.crew.domain.model

enum class CrewRoleType {
    LEADER,
    MEMBER,
}

enum class CrewStatusType {
    ACTIVE,
    CLOSED,
}

enum class CrewMemberStatusType {
    APPROVED,
    PENDING,
    REJECTED,
}

enum class CrewPostType {
    NOTICE,
    CHAT,
    SCHEDULE,
}
