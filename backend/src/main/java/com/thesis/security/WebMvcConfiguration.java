package com.thesis.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/*@Override
	public void addResourceHandlers(ResourceHandlerRegistry rr) {
		rr.addResourceHandler("/static/**").addResourceLocations("classpath:/public/static/");
		rr.addResourceHandler("/index.html").addResourceLocations("classpath:/public/index.html");
		rr.addResourceHandler("/favicon.ico").addResourceLocations("classpath:/public/favicon.ico");
	}*/
}