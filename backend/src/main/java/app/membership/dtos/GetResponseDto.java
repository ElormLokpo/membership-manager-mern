package app.membership.dtos;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class GetResponseDto extends ResponseDto {
    public Object data;
    public Integer pageNo;
    public Integer pageSize;
}
