package app.membership.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import app.membership.models.enums.RolesEnum;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class UserModel {

    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private UUID id;

    private String fullname;

    @Column(unique = true)
    private String email;

    private String password;

    @OneToOne(mappedBy = "user")
    private MembershipModel membership;

    @Enumerated(EnumType.STRING)
    private Set<RolesEnum> roles = new HashSet<>();

    Boolean isVerified = false;
}
