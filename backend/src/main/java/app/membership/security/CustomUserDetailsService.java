package app.membership.security;

import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import app.membership.exceptions.UserNotFoundException;
import app.membership.models.UserModel;
import app.membership.models.enums.RolesEnum;
import app.membership.repositories.UserRepository;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    UserRepository userRepository;

    @Autowired
    private CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserModel user = userRepository.findByEmail(username).orElseThrow(()-> new UserNotFoundException("User with: " + username + " is not found."));
        return new User(user.getEmail(), user.getPassword(), extractRoles(user.getRoles()));        
    }

    private Collection<GrantedAuthority> extractRoles(Collection<RolesEnum> roles) {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.name())).collect(Collectors.toList());
    }

}
