package app.membership.services;

import java.util.HashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import app.membership.daos.AuthServiceDao;
import app.membership.dtos.ResponseDto;
import app.membership.dtos.authDto.AuthResponseDto;
import app.membership.dtos.authDto.LoginUserRequestDto;
import app.membership.dtos.authDto.RegisterUserRequestDto;
import app.membership.dtos.userDto.GetAuthUserDto;
import app.membership.exceptions.UserExistsException;
import app.membership.exceptions.UserNotFoundException;
import app.membership.mappers.AuthUserMapper;
import app.membership.models.UserModel;
import app.membership.models.enums.RolesEnum;
import app.membership.repositories.UserRepository;
import app.membership.security.JwtGenerator;
import org.springframework.util.StringUtils;

@Service
public class AuthServiceImpl implements AuthServiceDao {

    PasswordEncoder passwordEncoder;
    UserRepository userRepository;
    JwtGenerator jwtGenerator;
    AuthenticationManager authenticationManager;
    EmailService emailService;

    @Autowired
    private AuthServiceImpl(PasswordEncoder passwordEncoder,
            UserRepository userRepository, JwtGenerator jwtGenerator, AuthenticationManager authenticationManager,
            EmailService emailService) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.jwtGenerator = jwtGenerator;
        this.authenticationManager = authenticationManager;
        this.emailService = emailService;
    }

    @Override
    public AuthResponseDto registerUser(RegisterUserRequestDto request) throws UserExistsException {
        Boolean userExists = userRepository.existsByEmail(request.getEmail());

        if (userExists) {
            throw new UserExistsException("User with email:" + request.getEmail() + " already exits.");
        }

        UserModel userFinal = AuthUserMapper.INSTANCE.registerUserDtoToModel(request);
        if (request.getRoles().isEmpty()) {
            HashSet<RolesEnum> defaultRoles = new HashSet<RolesEnum>();
            defaultRoles.add(RolesEnum.ROLE_ADMIN);

            userFinal.setRoles(defaultRoles);
        } else {
            // Remember to check for invalid roles
            HashSet<RolesEnum> userRoles = new HashSet<RolesEnum>();

            for (String requestRole : request.getRoles()) {
                userRoles.add(RolesEnum.valueOf(requestRole));
            }

            userFinal.setRoles(userRoles);
        }

        userFinal.setPassword(passwordEncoder.encode(request.getPassword()));

        UserModel userModel = userRepository.save(userFinal);

        GetAuthUserDto authUserDto = AuthUserMapper.INSTANCE.authUserModelToGetDto(userModel);
        authUserDto.setToken(jwtGenerator.generateToken(userModel.getEmail()));

        String userVerifyToken = jwtGenerator.generateToken(userModel.getEmail());
        emailService.sendVerifyMail(userModel.getEmail(),
                String.format("http://localhost:8080/api/v1/membership/auth/verify-user/%s", userVerifyToken));

        return AuthResponseDto.builder()
                .success(true)
                .message("User registered successfully.")
                .data(authUserDto)
                .build();

    }

    @Override
    public AuthResponseDto loginUser(LoginUserRequestDto request) {

        UserModel userModel = userRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new UserNotFoundException("User with email:" + request.getEmail() + " does not exits."));

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        GetAuthUserDto authUserDto = AuthUserMapper.INSTANCE.authUserModelToGetDto(userModel);
        authUserDto.setToken(jwtGenerator.generateToken(userModel.getEmail()));

        return AuthResponseDto.builder()
                .success(true)
                .message("User login successful.")
                .data(authUserDto)
                .build();

    }

    @Override
    public ResponseDto verifyUser(String token) {
        if (StringUtils.hasText(token)) {
            String emailFromToken = jwtGenerator.extractSubject(token);
            UserModel user = userRepository.findByEmail(emailFromToken)
                    .orElseThrow(() -> new UserNotFoundException("User with email: " + emailFromToken + "not found."));

            user.setIsVerified(true);
            userRepository.save(user);
            System.out.println(user);

            return ResponseDto.builder()
                    .success(true)
                    .message("User verified successfully.")
                    .build();
        }

        return ResponseDto.builder()
                .success(false)
                .message("Error validating user.")
                .build();

    }

    @Override
    public ResponseDto sendVerifyEmail(String email) {

        String userVerifyToken = jwtGenerator.generateToken(email);
        emailService.sendVerifyMail(email,
                String.format("http://localhost:8080/api/v1/membership/auth/verify-user/%s", userVerifyToken));

        return ResponseDto.builder().success(true).message("Verification email sent successfully").build();
    }
}
