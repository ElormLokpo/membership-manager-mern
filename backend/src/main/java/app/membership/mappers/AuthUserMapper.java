package app.membership.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import app.membership.dtos.authDto.RegisterUserRequestDto;
import app.membership.dtos.userDto.GetAuthUserDto;
import app.membership.models.UserModel;

@Mapper
public interface AuthUserMapper {
    public AuthUserMapper INSTANCE = Mappers.getMapper(AuthUserMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "membership", ignore = true)
    @Mapping(target = "roles", ignore = true)
    UserModel registerUserDtoToModel(RegisterUserRequestDto requestDto);

    
    @Mapping(target = "token", ignore = true)
    GetAuthUserDto authUserModelToGetDto(UserModel user);
}
