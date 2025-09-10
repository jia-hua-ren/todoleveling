package com.app.todoapp.config;

import java.net.URI;
import java.net.URISyntaxException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;

@Configuration
@Profile("prod") // this bean will only load when 'prod' profile is active
public class SessionConfig {

    @Value("${BASE_URL}")
    private String backendUrl;

    public String getParentDomain(String url) {
        try {
            URI uri = new URI(url);
            String host = uri.getHost(); // e.g. "todo-backend.onrender.com"
            int firstDot = host.indexOf('.');
            if (firstDot != -1) {
                return host.substring(firstDot + 1); // "onrender.com"
            } else {
                return host; // fallback if no dot found
            }
        } catch (URISyntaxException e) {
            throw new RuntimeException("Invalid URL: " + url, e);
        }
    }

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();

        serializer.setCookieName("JSESSIONID");
        serializer.setCookiePath("/");
        serializer.setDomainName(getParentDomain(backendUrl)); // prod backend domain
        serializer.setUseSecureCookie(true); // HTTPS required
        serializer.setUseHttpOnlyCookie(true);
        serializer.setSameSite("None"); // cross-site

        return serializer;
    }
}