package com.app.todoapp.controller;

import java.io.IOException;
import java.net.URI;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Auth endpoints (Google OAuth2).
 */
@RestController
public class AuthController {
    @GetMapping("/auth/login")
    public ResponseEntity<Void> login() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/oauth2/authorization/google"))
                .build();
    }

}