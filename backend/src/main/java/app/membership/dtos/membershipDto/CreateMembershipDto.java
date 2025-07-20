package app.membership.dtos.membershipDto;

import app.membership.models.UserModel;
import app.membership.models.enums.MembershipEnum;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CreateMembershipDto {
    private UserModel user;

    private MembershipEnum membership;
}
