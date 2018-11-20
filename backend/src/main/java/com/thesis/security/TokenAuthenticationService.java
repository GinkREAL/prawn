package com.thesis.security;

import static java.util.Collections.emptyList;

import java.io.IOException;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenAuthenticationService {
	static final long EXPIRATIONTIME = 14_400_000; // 8 hours 28_800_000
	static final String SECRET = "Seecret";
	static final String TOKEN_PREFIX = "Bearer ";
	static final String HEADER_STRING = "Authorization";

	static void addAuthentication(HttpServletResponse res, String username) throws IOException {
		String JWT = Jwts.builder().setSubject(username)
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATIONTIME))
				.signWith(SignatureAlgorithm.HS256, SECRET).compact();
		res.addHeader(HEADER_STRING, TOKEN_PREFIX + JWT);
		res.setContentType("application/json");
		res.getWriter().write("{\"token\":\"" + JWT + "\"}");
	}

	static Authentication getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);
		String user = null;
		if(token != null)
		{
			token = token.replace(TOKEN_PREFIX, "");
			try {
				user = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody().getSubject();
			} catch (ExpiredJwtException ex) {
				return null;
			}
		}
		return user != null ? new UsernamePasswordAuthenticationToken(user, null, emptyList()) : null;
	}

}