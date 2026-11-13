package backend.team.ahachul_backend.api.crew.adapter.web.out

import backend.team.ahachul_backend.api.crew.domain.entity.CrewPostEntity
import org.springframework.data.jpa.repository.EntityGraph
import org.springframework.data.jpa.repository.JpaRepository

interface CrewPostRepository : JpaRepository<CrewPostEntity, Long> {

    @EntityGraph(attributePaths = ["member"])
    fun findByCrewIdOrderByCreatedAtDesc(crewId: Long): List<CrewPostEntity>
}
