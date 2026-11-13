package backend.team.ahachul_backend.api.crew.domain.model

enum class CrewCategoryType(val description: String) {
    COMMUTE("출퇴근"),
    READING("독서/자기계발"),
    RUNNING("러닝/운동"),
    FOOD("맛집/카페"),
    STUDY("스터디"),
    CULTURE("문화/전시"),
    ETC("기타"),
}
