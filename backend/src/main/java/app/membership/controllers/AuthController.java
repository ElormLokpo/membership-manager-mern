package app.membership.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import app.membership.dtos.ResponseDto;
import app.membership.dtos.authDto.AuthResponseDto;
import app.membership.dtos.authDto.LoginUserRequestDto;
import app.membership.dtos.authDto.RegisterUserRequestDto;
import app.membership.services.AuthServiceImpl;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/membership/auth")
public class AuthController {

    AuthServiceImpl authService;

    @Autowired
    public AuthController(AuthServiceImpl authService) {
        this.authService = authService;
    }

    @PostMapping("register")
    public ResponseEntity<AuthResponseDto> registerUser(@RequestBody RegisterUserRequestDto request) {
        return ResponseEntity.ok(authService.registerUser(request));
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDto> loginUser(@RequestBody LoginUserRequestDto request) {
        return ResponseEntity.ok(authService.loginUser(request));
    }

    @GetMapping("verify-user/{token}")
    public ResponseEntity<ResponseDto> verifyUser(@PathVariable String token) {
        return ResponseEntity.ok(authService.verifyUser(token));
    }

    @PostMapping("send-verify-email")
    public ResponseEntity<ResponseDto> sendVerifyEmail(@RequestBody String email) {
        return ResponseEntity.ok(authService.sendVerifyEmail(email));
    }

}
