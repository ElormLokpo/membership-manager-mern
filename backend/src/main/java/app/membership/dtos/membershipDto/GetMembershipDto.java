package app.membership.dtos.membershipDto;

import java.util.UUID;

import app.membership.models.UserModel;
import app.membership.models.enums.MembershipEnum;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetMembershipDto {
    private UUID id;
    private UserModel user;

    private MembershipEnum membership;
}
