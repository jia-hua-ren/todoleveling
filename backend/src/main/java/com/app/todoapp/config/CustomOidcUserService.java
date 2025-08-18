package com.app.todoapp.config;

import com.app.todoapp.model.User;
import com.app.todoapp.repository.UserRepository;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class CustomOidcUserService extends OidcUserService {
    private final UserRepository userRepository;

    public CustomOidcUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) {
        OidcUser oidcUser = super.loadUser(userRequest);

        String sub = oidcUser.getSubject(); // unique Google user ID

        // Create user if not exists
        userRepository.findById(sub).orElseGet(() -> {
            User newUser = new User(
                    sub,
                    oidcUser.getFullName(),
                    oidcUser.getEmail(),
                    oidcUser.getPicture());
            return userRepository.save(newUser);
        });

        return oidcUser;
    }
}
