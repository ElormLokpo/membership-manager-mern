package app.membership.dtos.authDto;

import app.membership.dtos.ResponseDto;
import app.membership.dtos.userDto.GetAuthUserDto;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Data
public class AuthResponseDto extends ResponseDto {
    GetAuthUserDto data;
}
