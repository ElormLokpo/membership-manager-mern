package app.membership.dtos;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ErrorResponseDto extends ResponseDto {
    Object data;
}
