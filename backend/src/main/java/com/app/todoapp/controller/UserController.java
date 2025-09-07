package com.app.todoapp.controller;

import com.app.todoapp.dto.ExpUpdateRequest;
import com.app.todoapp.dto.UserDto;
import com.app.todoapp.model.User;
import com.app.todoapp.repository.UserRepository;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
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

    @PostMapping("/me/complete-task")
    public UserDto completeTask(@AuthenticationPrincipal OidcUser oidcUser,
            @RequestParam(defaultValue = "10") int expGain) {
        // Get the authenticated user
        User user = userRepository.findById(oidcUser.getSubject())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Add experience points for completing a task
        int newExp = user.getExp() + expGain;

        // Handle level up
        int currentLevel = user.getLevel();
        while (newExp >= 100) {
            newExp -= 100;
            currentLevel++;
        }

        // Update user
        user.setExp(newExp);
        user.setLevel(currentLevel);
        user = userRepository.save(user);

        return UserDto.from(user);
    }

}
