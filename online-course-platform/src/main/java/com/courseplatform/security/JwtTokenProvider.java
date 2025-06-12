package com.courseplatform.security;

import com.courseplatform.config.JwtConfig;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtTokenProvider {

    @Autowired
    private JwtConfig jwtConfig;

    private Key key;

    @PostConstruct
    public void init() {
        // 使用配置的秘钥生成Key对象
        this.key = Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
    }

    /**
     * 生成JWT令牌
     * @param username 用户名
     * @return JWT字符串
     */
    public String generateToken(String username) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtConfig.getExpirationSeconds() * 1000);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /**
     * 从Token中获取用户名
     */
    public String getUsernameFromJWT(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    /**
     * 验证Token有效性
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (SecurityException | MalformedJwtException ex) {
            System.out.println("无效的JWT签名");
        } catch (ExpiredJwtException ex) {
            System.out.println("JWT已过期");
        } catch (UnsupportedJwtException ex) {
            System.out.println("不支持的JWT");
        } catch (IllegalArgumentException ex) {
            System.out.println("JWT参数为空");
        }
        return false;
    }
}