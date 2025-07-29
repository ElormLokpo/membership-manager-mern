package app.membership.dtos.staffDto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GetStaffDto {

    private String fullname;

    private String email;

    private String password;

}
