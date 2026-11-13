package backend.team.ahachul_backend.api.openchat.adapter.`in`

import backend.team.ahachul_backend.api.openchat.adapter.`in`.dto.OpenChatDto
import backend.team.ahachul_backend.api.openchat.application.port.`in`.OpenChatUseCase
import backend.team.ahachul_backend.common.annotation.Authentication
import backend.team.ahachul_backend.common.response.CommonResponse
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/v2/open-chats")
class OpenChatController(
    private val openChatUseCase: OpenChatUseCase,
) {

    @GetMapping("/subway-lines/{subwayLineId}")
    fun getSubwayLineChatRoom(
        @PathVariable subwayLineId: Long,
    ): CommonResponse<OpenChatDto.OpenChatRoomResponse> {
        return CommonResponse.success(openChatUseCase.getOrCreateSubwayLineChatRoom(subwayLineId))
    }

    @GetMapping("/stations/{stationId}")
    fun getStationChatRoom(
        @PathVariable stationId: Long,
    ): CommonResponse<OpenChatDto.OpenChatRoomResponse> {
        return CommonResponse.success(openChatUseCase.getOrCreateStationChatRoom(stationId))
    }

    @GetMapping("/{chatRoomId}/messages")
    fun getMessages(
        @PathVariable chatRoomId: Long,
        @RequestParam(required = false) cursorId: Long?,
        @RequestParam(defaultValue = "30") pageSize: Int,
    ): CommonResponse<OpenChatDto.MessageListResponse> {
        return CommonResponse.success(openChatUseCase.getMessages(chatRoomId, cursorId, pageSize))
    }

    @Authentication
    @PostMapping("/{chatRoomId}/messages")
    fun sendMessage(
        @PathVariable chatRoomId: Long,
        @RequestBody request: OpenChatDto.SendMessageRequest,
    ): CommonResponse<OpenChatDto.OpenChatMessageResponse> {
        return CommonResponse.success(openChatUseCase.sendMessage(request.toCommand(chatRoomId)))
    }
}
