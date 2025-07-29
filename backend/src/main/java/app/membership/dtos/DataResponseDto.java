package app.membership.dtos;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class DataResponseDto extends ResponseDto {
    public Object data;
}
