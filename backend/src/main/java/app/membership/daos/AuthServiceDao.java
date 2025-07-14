package app.membership.daos;

import app.membership.dtos.ResponseDto;
import app.membership.dtos.authDto.AuthResponseDto;
import app.membership.dtos.authDto.LoginUserRequestDto;
import app.membership.dtos.authDto.RegisterUserRequestDto;
import app.membership.exceptions.UserExistsException;

public interface AuthServiceDao {
    AuthResponseDto registerUser(RegisterUserRequestDto request) throws UserExistsException;

    AuthResponseDto loginUser(LoginUserRequestDto request);

    public ResponseDto verifyUser(String token);

    public ResponseDto sendVerifyEmail(String email);
}
