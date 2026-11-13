package backend.team.ahachul_backend.api.train.adapter.`in`

import backend.team.ahachul_backend.api.train.adapter.`in`.dto.TrainTrackingDto
import backend.team.ahachul_backend.api.train.application.port.`in`.TrainTrackingUseCase
import backend.team.ahachul_backend.common.annotation.Authentication
import backend.team.ahachul_backend.common.response.CommonResponse
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v2/trains")
class TrainTrackingController(
    private val trainTrackingUseCase: TrainTrackingUseCase,
) {

    @GetMapping("/tracking")
    fun trackTrain(
        request: TrainTrackingDto.TrackTrainRequest,
    ): CommonResponse<TrainTrackingDto.TrainLocationResponse> {
        return CommonResponse.success(trainTrackingUseCase.trackTrain(request.toCommand()))
    }

    @Authentication
    @PostMapping("/alerts/offboard")
    fun createOffboardAlert(
        @RequestBody request: TrainTrackingDto.CreateOffboardAlertRequest,
    ): CommonResponse<TrainTrackingDto.OffboardAlertResponse> {
        return CommonResponse.success(trainTrackingUseCase.createOffboardAlert(request.toCommand()))
    }

    @Authentication
    @GetMapping("/alerts/offboard/me")
    fun getMyActiveAlerts(): CommonResponse<List<TrainTrackingDto.OffboardAlertResponse>> {
        return CommonResponse.success(trainTrackingUseCase.getMyActiveAlerts())
    }

    @Authentication
    @DeleteMapping("/alerts/offboard/{alertId}")
    fun cancelOffboardAlert(
        @PathVariable alertId: Long,
    ): CommonResponse<Unit> {
        trainTrackingUseCase.cancelOffboardAlert(alertId)
        return CommonResponse.success()
    }
}
