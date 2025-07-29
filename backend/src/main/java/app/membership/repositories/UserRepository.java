package app.membership.repositories;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import app.membership.models.UserModel;
import app.membership.models.enums.RolesEnum;

@Repository
public interface UserRepository extends JpaRepository<UserModel, UUID> {
    Optional<UserModel> findByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("SELECT u FROM users u WHERE :role MEMBER OF u.roles")
    Page<UserModel> findUsersByRRole(@Param("role") RolesEnum role, Pageable pageable);
}
