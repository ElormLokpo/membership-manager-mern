package app.membership.dtos.userDto;

import java.util.Set;
import java.util.UUID;
import app.membership.models.MembershipModel;
import app.membership.models.enums.RolesEnum;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetAuthUserDto {
    private UUID id;
    
    private String fullname;

    private String email;

    private String token;

    private MembershipModel membership;

    private Set<RolesEnum> roles;
}
