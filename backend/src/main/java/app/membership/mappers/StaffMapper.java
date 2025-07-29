package app.membership.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import app.membership.dtos.staffDto.CreateStaffDto;
import app.membership.dtos.staffDto.GetStaffDto;
import app.membership.models.UserModel;

@Mapper
public interface StaffMapper {
    public StaffMapper INSTANCE = Mappers.getMapper(StaffMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "membership", ignore = true)
    @Mapping(target = "roles", ignore = true)
    public UserModel createStaffDtoToModel(CreateStaffDto staffDto);

    public GetStaffDto userModelToGetStaff(UserModel staff);
}
