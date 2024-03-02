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
}
