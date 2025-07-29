package app.membership.services;

import java.util.Collection;
import java.util.HashSet;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import app.membership.daos.StaffServiceDao;
import app.membership.dtos.staffDto.CreateStaffDto;
import app.membership.dtos.staffDto.GetStaffDto;
import app.membership.exceptions.UserExistsException;
import app.membership.exceptions.UserNotFoundException;
import app.membership.mappers.StaffMapper;
import app.membership.models.UserModel;
import app.membership.models.enums.RolesEnum;
import app.membership.repositories.UserRepository;

@Service
public class StaffService implements StaffServiceDao {

    private UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    public StaffService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Boolean addStaff(CreateStaffDto staffDto) {

        Boolean staffExists = userRepository.existsByEmail(staffDto.getEmail());

        if (staffExists) {
            throw new UserExistsException("Staff with email:" + staffDto.getEmail() + " already exits.");
        }

        UserModel staffFinal = StaffMapper.INSTANCE.createStaffDtoToModel(staffDto);
        if (staffDto.getRoles().isEmpty()) {
            HashSet<RolesEnum> defaultRoles = new HashSet<RolesEnum>();
            defaultRoles.add(RolesEnum.ROLE_FRONTDESK);

            staffFinal.setRoles(defaultRoles);
        } else {
            // Remember to check for invalid roles
            HashSet<RolesEnum> staffRoles = new HashSet<RolesEnum>();

            for (String requestRole : staffDto.getRoles()) {
                staffRoles.add(RolesEnum.valueOf(requestRole));
            }

            staffFinal.setRoles(staffRoles);
        }

        staffFinal.setPassword(passwordEncoder.encode(staffDto.getPassword()));

        userRepository.save(staffFinal);

        return true;
    }

    @Override
    public Collection<GetStaffDto> getAllStaff(String sortBy, String sortDir, Integer pageSize, Integer pageNo) {
        Sort sort = sortBy.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Collection<UserModel> staffCollection = userRepository.findUsersByRRole(RolesEnum.ROLE_FRONTDESK, pageable)
                .getContent();
        return staffCollection.stream().map(staff -> StaffMapper.INSTANCE.userModelToGetStaff(staff))
                .collect(Collectors.toList());

    }

    @Override
    public UserModel getStaff(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with id:" + id + " not found"));
    }

    @Override
    public Boolean updateStaff(UserModel staff) {
        if (userRepository.existsById(staff.getId())) {
            userRepository.save(staff);
            return true;
        }

        throw new UserNotFoundException("User with id:" + staff.getId() + " not found");

    }

    @Override
    public Boolean deleteStaff(UUID id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }

        throw new UserNotFoundException("User with id:" + id + " not found");

    }

}
