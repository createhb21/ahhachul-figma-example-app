package backend.team.ahachul_backend.api.train.application.service

import backend.team.ahachul_backend.api.common.application.port.out.StationReader
import backend.team.ahachul_backend.api.member.application.port.out.MemberReader
import backend.team.ahachul_backend.api.train.adapter.`in`.dto.TrainTrackingDto
import backend.team.ahachul_backend.api.train.application.port.`in`.TrainTrackingUseCase
import backend.team.ahachul_backend.api.train.application.port.`in`.dto.CreateOffboardAlertCommand
import backend.team.ahachul_backend.api.train.application.port.`in`.dto.TrackTrainLocationCommand
import backend.team.ahachul_backend.api.train.application.port.out.TrainOffboardAlertReader
import backend.team.ahachul_backend.api.train.application.port.out.TrainOffboardAlertWriter
import backend.team.ahachul_backend.api.train.domain.entity.TrainOffboardAlertEntity
import backend.team.ahachul_backend.common.client.SeoulTrainClient
import backend.team.ahachul_backend.common.exception.CommonException
import backend.team.ahachul_backend.common.persistence.SubwayLineReader
import backend.team.ahachul_backend.common.response.ResponseCode
import backend.team.ahachul_backend.common.utils.RequestUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import kotlin.math.abs

@Service
@Transactional(readOnly = true)
class TrainTrackingService(
    private val seoulTrainClient: SeoulTrainClient,
    private val trainOffboardAlertReader: TrainOffboardAlertReader,
    private val trainOffboardAlertWriter: TrainOffboardAlertWriter,
    private val memberReader: MemberReader,
    private val stationReader: StationReader,
    private val subwayLineReader: SubwayLineReader,
) : TrainTrackingUseCase {

    override fun trackTrain(command: TrackTrainLocationCommand): TrainTrackingDto.TrainLocationResponse {
        val positionDto = seoulTrainClient.getRealtimePositions(command.subwayLineName)
        val trainPosition = positionDto.realtimePositionList.firstOrNull { it.trainNo == command.trainNo }

        val currentStationName = trainPosition?.statnNm ?: "운행 정보 대기 중"
        val destinationDirection = trainPosition?.statnTnm ?: "종착역 방면"
        val rawStatus = trainPosition?.trainSttus ?: "1"
        val statusText = when (rawStatus) {
            "0" -> "진입"
            "1" -> "도착"
            "2" -> "출발"
            "3" -> "전역 출발"
            else -> "운행 중"
        }

        var destinationStationName: String? = null
        var remainingStationCount: Int? = null
        var estimatedMinutesRemaining: Int? = null
        var isAlertTriggered = false

        if (command.destinationStationId != null) {
            val destinationStation = stationReader.getById(command.destinationStationId)
            destinationStationName = destinationStation.name

            // 정거장 수 계산: 실시간 위치 역과 목적지역 간 거리 추정
            if (trainPosition != null && trainPosition.statnNm.isNotBlank()) {
                val currentStation = runCatching { stationReader.getByName(trainPosition.statnNm) }.getOrNull()
                if (currentStation != null) {
                    val diff = abs((destinationStation.id - currentStation.id).toInt()).coerceAtLeast(0)
                    remainingStationCount = diff
                    estimatedMinutesRemaining = diff * 2 // 평균 역간 소요시간 약 2분

                    // 목적지 직전 1정거장 이하이거나 도착 시 알림 트리거
                    if (diff <= 1) {
                        isAlertTriggered = true
                    }
                }
            }
        }

        return TrainTrackingDto.TrainLocationResponse(
            trainNo = command.trainNo,
            subwayLineName = command.subwayLineName,
            currentStationName = currentStationName,
            destinationDirection = destinationDirection,
            trainStatus = rawStatus,
            trainStatusText = statusText,
            destinationStationName = destinationStationName,
            remainingStationCount = remainingStationCount,
            estimatedMinutesRemaining = estimatedMinutesRemaining,
            isOffboardAlertTriggered = isAlertTriggered,
        )
    }

    @Transactional
    override fun createOffboardAlert(command: CreateOffboardAlertCommand): TrainTrackingDto.OffboardAlertResponse {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        if (trainOffboardAlertReader.existsActiveAlert(memberId, command.trainNo)) {
            throw CommonException(ResponseCode.OFFBOARD_ALERT_ALREADY_EXISTS)
        }

        val member = memberReader.getMember(memberId)
        val subwayLine = subwayLineReader.getSubwayLine(command.subwayLineId)
        val destinationStation = stationReader.getById(command.destinationStationId)

        val alert = trainOffboardAlertWriter.save(
            TrainOffboardAlertEntity.of(
                member = member,
                trainNo = command.trainNo,
                subwayLine = subwayLine,
                destinationStation = destinationStation,
                alertBeforeStationCount = command.alertBeforeStationCount,
            )
        )

        return TrainTrackingDto.OffboardAlertResponse.of(alert)
    }

    override fun getMyActiveAlerts(): List<TrainTrackingDto.OffboardAlertResponse> {
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        return trainOffboardAlertReader.findMyActiveAlerts(memberId)
            .map { TrainTrackingDto.OffboardAlertResponse.of(it) }
    }

    @Transactional
    override fun cancelOffboardAlert(alertId: Long) {
        val alert = trainOffboardAlertReader.findById(alertId)
            ?: throw CommonException(ResponseCode.OFFBOARD_ALERT_NOT_FOUND)
        val memberId = RequestUtils.getAttribute("memberId")!!.toLong()
        if (alert.member.id != memberId) {
            throw CommonException(ResponseCode.INVALID_AUTH)
        }
        alert.cancel()
        trainOffboardAlertWriter.save(alert)
    }
}
