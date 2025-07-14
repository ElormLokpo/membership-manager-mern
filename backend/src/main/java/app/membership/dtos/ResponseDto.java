package app.membership.dtos;

import lombok.Data;
import lombok.experimental.SuperBuilder;

@Data
@SuperBuilder
public class ResponseDto {
   Boolean success;
   String message;

}
