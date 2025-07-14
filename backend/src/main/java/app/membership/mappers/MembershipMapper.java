package app.membership.mappers;

import org.mapstruct.Mapper;

import app.membership.dtos.membershipDto.CreateMembershipDto;
import app.membership.dtos.membershipDto.GetMembershipDto;
import app.membership.models.MembershipModel;

@Mapper(componentModel = "spring")
public interface MembershipMapper {

    MembershipModel createMembershipDtoToModel(CreateMembershipDto membership);

    GetMembershipDto membershipModelToGetDto(MembershipModel membership);
}
