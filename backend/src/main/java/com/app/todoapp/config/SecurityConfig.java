package com.app.todoapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity

public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/public/**", "/auth/**", "/oauth2/**", "/login/**").permitAll()
                .anyRequest().authenticated())
                .oauth2Login(oauth -> oauth
                        // force redirect to frontend after login
                        .defaultSuccessUrl("http://localhost:3000/dashboard", true)
                        .failureUrl("/auth/login?error"))
                .logout(logout -> logout
                        .logoutSuccessUrl("http://localhost:3000")
                        .permitAll());

        return http.build();
    }
}
