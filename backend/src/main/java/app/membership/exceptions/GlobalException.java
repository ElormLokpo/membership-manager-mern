package app.membership.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import app.membership.dtos.ErrorResponseDto;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<ErrorResponseDto> UserExistsExceptionHandler(UserExistsException exception,
            WebRequest request) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ErrorResponseDto.builder()
                        .message(exception.getMessage())
                        .data(request.getDescription(true))
                        .build());
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> UserNotFoundExceptionHandler(UserNotFoundException exception,
            WebRequest request) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ErrorResponseDto.builder()
                        .success(false)
                        .message(exception.getMessage())
                        .data(request.getDescription(true))
                        .build());
    }
}
