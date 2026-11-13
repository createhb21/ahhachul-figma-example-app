package backend.team.ahachul_backend.common.dto

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonProperty

@JsonIgnoreProperties(ignoreUnknown = true)
data class RealtimePositionResponseDto(
    @JsonProperty("status")
    val status: Int? = null,
    @JsonProperty("total")
    val total: Int = 0,
    @JsonProperty("realtimePositionList")
    val realtimePositionList: List<RealtimePositionItemDto> = emptyList(),
)

@JsonIgnoreProperties(ignoreUnknown = true)
data class RealtimePositionItemDto(
    @JsonProperty("subwayId")
    val subwayId: String = "",
    @JsonProperty("subwayNm")
    val subwayNm: String = "",
    @JsonProperty("statnId")
    val statnId: String = "",
    @JsonProperty("statnNm")
    val statnNm: String = "",
    @JsonProperty("trainNo")
    val trainNo: String = "",
    @JsonProperty("lastStnId")
    val lastStnId: String? = null,
    @JsonProperty("statnTnm")
    val statnTnm: String? = null,
    @JsonProperty("trainSttus")
    val trainSttus: String? = null, // 0: 진입, 1: 도착, 2: 출발, 3: 전역출발
    @JsonProperty("directAt")
    val directAt: String? = null,
    @JsonProperty("lstcarAt")
    val lstcarAt: String? = null,
)
