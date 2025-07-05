package com.vishwa.config;


import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "cors")
public class CorsProps {
    private List<String> allowedOrigins;
    private List<String> allowMethods;

    public List<String> getAllowedOrigins() {
        return allowedOrigins;
    }

    public void setAllowedOrigins(List<String> allowedOrigins) {
        this.allowedOrigins = allowedOrigins;
    }

    public List<String> getAllowMethods() {
        return allowMethods;
    }

    public void setAllowMethods(List<String> allowMethods) {
        this.allowMethods = allowMethods;
    }
}
