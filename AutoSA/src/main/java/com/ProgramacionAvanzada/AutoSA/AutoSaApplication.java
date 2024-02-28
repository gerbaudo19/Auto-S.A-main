package com.ProgramacionAvanzada.AutoSA;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AutoSaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AutoSaApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://127.0.0.1:5500");
                registry.addMapping("/personalDeTrabajo/deleteByOrdenTrabajoId/**").allowedOrigins("http://127.0.0.1:5500");
                registry.addMapping("/detalleOrdenTrabajo/deleteByOrdenTrabajoId/**").allowedOrigins("http://127.0.0.1:5500");
            }
        };
    }
}
