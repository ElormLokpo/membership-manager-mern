package app.membership.daos;

import java.util.Collection;
import java.util.UUID;

import app.membership.dtos.staffDto.CreateStaffDto;
import app.membership.dtos.staffDto.GetStaffDto;
import app.membership.models.UserModel;

public interface StaffServiceDao {

    public Boolean addStaff(CreateStaffDto staffDto);

    public Collection<GetStaffDto> getAllStaff(String sortBy, String sortDir, Integer pageSize, Integer pageNo);

    public UserModel getStaff(UUID id);

    public Boolean updateStaff(UserModel staff);

    public Boolean deleteStaff(UUID id);
}
