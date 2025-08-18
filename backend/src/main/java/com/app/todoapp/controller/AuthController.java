package com.app.todoapp.controller;

import java.net.URI;
import java.security.Principal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Auth endpoints (Google OAuth2).
 */
@RestController
public class AuthController {

    // GET /auth/login -> 302 redirect to Spring Security's Google entry point
    @GetMapping("/auth/login")
    public ResponseEntity<Void> login() {
        // "google" = registrationId (from client registration)
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/oauth2/authorization/google"))
                .build();
    }

    // @GetMapping("/user")
    // public Principal user(Principal user) {
    // return user;
    // }
}