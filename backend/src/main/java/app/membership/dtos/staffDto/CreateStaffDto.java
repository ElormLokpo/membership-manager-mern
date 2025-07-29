package app.membership.dtos.staffDto;

import app.membership.dtos.authDto.RegisterUserRequestDto;
import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class CreateStaffDto extends RegisterUserRequestDto {
    
}
