package app.membership.dtos.authDto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginUserRequestDto {
    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
