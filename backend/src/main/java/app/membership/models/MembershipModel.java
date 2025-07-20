package app.membership.models;

import java.util.UUID;
import app.membership.models.enums.MembershipEnum;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "memberships")
@Data
@Builder
public class MembershipModel {
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private UUID id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private UserModel user;

    @Enumerated(EnumType.STRING)
    private MembershipEnum membership;
}
