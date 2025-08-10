package com.vishwa.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;
import java.security.Key;
import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

import static java.time.temporal.ChronoUnit.DAYS;


@Service
public class JWTUtils {

    public static final String SECRET_KEY =
            "foobar_12345678_foobar_12345678_foobar_12345678_foobar_12345678_foobar_12345678";

    public String issueToken(String subject){

        return issueToken(subject,Map.of());
    }

    public String issueToken(String subject, String ...scopes){

        return issueToken(subject,Map.of("scopes", scopes));
    }

    public String issueToken(String subject, List<String> scopes){

        return issueToken(subject,Map.of("scopes", scopes));
    }

    public String issueToken(String subject, Map<String, Object> claims){
        String token = Jwts
                .builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuer("www.vaibsite.com")
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(
                        Date.from(Instant.now().plus(15,DAYS))
                )
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();

        return token;
    }

    private Claims getClaims(String token){
        Claims claims = Jwts
                .parser()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims;
    }

    public String getSubject(String token){
        return getClaims(token).getSubject();
    }

    private Key getSigningKey(){

        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public boolean isTokenValid(String jwtToken, String userName){
        String subject = getSubject(jwtToken);
        return subject.equals(userName) && !isTokenExpired(jwtToken);
    }

    private boolean isTokenExpired(String jwtToken){
        Date today = Date.from(Instant.now());
        return getClaims(jwtToken).getExpiration().before(today);
    }

}
