package com.app.todoapp.controller;

import com.app.todoapp.dto.UserDto;
import com.app.todoapp.repository.UserRepository;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get current logged-in user
    @GetMapping("/me")
    public UserDto getCurrentUser(@AuthenticationPrincipal OidcUser oidcUser) {
        return userRepository.findById(oidcUser.getSubject())
                .map(UserDto::from)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

}
