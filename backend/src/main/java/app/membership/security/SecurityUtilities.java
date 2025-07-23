package app.membership.security;

import java.util.Collection;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.lang.Collections;

@Component
public class SecurityUtilities {

    public String getAuthEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getName();
        }

        return null;
    }

    public Collection<? extends GrantedAuthority> getAuthRoles() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            return authentication.getAuthorities();
        }

        return Collections.emptyList();

    }

    public Boolean hasAnyRole(String role) {
        return getAuthRoles().stream().anyMatch(authority -> authority.getAuthority().equals("ROLE_" + role));
    }
}
