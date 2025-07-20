package app.membership.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.membership.models.MembershipModel;

@Repository
public interface MembershipRepository extends JpaRepository<MembershipModel, UUID> {

}
