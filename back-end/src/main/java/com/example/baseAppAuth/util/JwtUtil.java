package com.example.baseAppAuth.util;

import com.example.baseAppAuth.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Slf4j
@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class); // Initialize SLF4J logger

    @Value("${jwtSecret}")
    private String jwtSecret;

    @Value("${jwtExpirationMs}")
    private int jwtExpirationMs;

    // This will be initialized once for better performance
    private SecretKey key;

    // Initialize the key after the properties are set
    // You could also use a @PostConstruct method if you prefer
    public void init() {
        if (this.key == null) {
            byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
            this.key = Keys.hmacShaKeyFor(keyBytes); // Use HS512
        }
    }

    public String generateJwtToken(Authentication authentication) {

        UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

        // Ensure the key is initialized (in case init() wasn't explicitly called, though Spring manages @Value)
        if (this.key == null) {
            init();
        }

        return Jwts
                .builder()
                .subject(userPrincipal.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256) // Use the SecretKey and specify algorithm
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        // Ensure the key is initialized
        if (this.key == null) {
            init();
        }
        return Jwts.parser()
                .verifyWith(key) // Use verifyWith for parsing
                .build() // Build the parser
                .parseSignedClaims(token) // Use parseSignedClaims
                .getPayload() // Get the payload (claims)
                .getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            // Ensure the key is initialized
            if (this.key == null) {
                init();
            }
            Jwts.parser()
                    .verifyWith(key) // Use verifyWith for parsing
                    .build() // Build the parser
                    .parseSignedClaims(authToken); // Use parseSignedClaims
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
