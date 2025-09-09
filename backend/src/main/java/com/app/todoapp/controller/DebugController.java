package com.app.todoapp.controller;

import java.util.Arrays;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController

public class DebugController {

    @GetMapping("/api/debug/cookies")
    public ResponseEntity<String> debugCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            Arrays.stream(cookies).forEach(c -> System.out.println(c.getName() + "=" + c.getValue()));
        }
        return ResponseEntity.ok("Cookies printed to console");
    }

}
