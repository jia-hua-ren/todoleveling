package com.app.todoapp.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.config.Customizer;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

        private final CustomOidcUserService customOidcUserService;

        public SecurityConfig(CustomOidcUserService customOidcUserService) {
                this.customOidcUserService = customOidcUserService;
        }

        @Value("${FRONTEND_URL:http://localhost:3000}")
        private String frontendUrl;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http)
                        throws Exception {
                http
                                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))
                                .cors(Customizer.withDefaults())
                                .csrf(csrf -> csrf
                                                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                                                .ignoringRequestMatchers("/logout", "/h2-console/**"))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/", "/public/**", "/auth/**", "/oauth2/**",
                                                                "/login/**", "/h2-console/**", "/logout")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .oauth2Login(oauth -> oauth
                                                .userInfoEndpoint(userInfo -> userInfo
                                                                .oidcUserService(customOidcUserService) // custom user
                                                                                                        // service
                                                )
                                                // force redirect to frontend after login
                                                .defaultSuccessUrl(frontendUrl + "/dashboard", true)
                                                .failureUrl("/auth/login?error"))
                                .exceptionHandling(customizer -> {
                                        customizer.authenticationEntryPoint(
                                                        (request, response, authException) -> {
                                                                response.sendError(401, "Unauthorized");
                                                        });
                                });

                return http.build();
        }
}
