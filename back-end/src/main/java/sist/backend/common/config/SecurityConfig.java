package sist.backend.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * 보안 설정 클래스
 * 개발 초기 단계에서는 대부분의 보안 제약을 해제하여 API 개발에 집중할 수 있도록 함
 * Spring Security 6.1+ 버전에 맞게 최신화된 설정
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * 보안 필터 체인 설정
     * 개발 단계에서는 대부분의 보안 제약을 비활성화
     */
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
            // CSRF 보호 비활성화 (개발 편의성)
            .csrf(csrf -> csrf.disable())

            // CORS 설정 허용
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

            // 세션 관리 설정 - STATELESS로 설정하여 세션 사용 안함
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            // 요청에 대한 권한 설정 - 모든 요청 허용 (개발 단계)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll() // 모든 경로에 대해 접근 허용
            )

            // HTTP Basic 인증 비활성화
            .httpBasic(basic -> basic.disable())

            // Form 로그인 비활성화
            .formLogin(form -> form.disable())

            .build();
    }

    /**
     * CORS 설정
     * 개발 단계에서는 모든 출처(Origin)에서 오는 요청을 허용
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*")); // 모든 출처 허용
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 모든 HTTP 메서드 허용
        configuration.setAllowedHeaders(List.of("*")); // 모든 헤더 허용
        configuration.setAllowCredentials(false); // 자격 증명 비활성화

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // 모든 경로에 CORS 설정 적용
        return source;
    }

    /**
     * 비밀번호 인코더
     * 실제 사용자 인증 기능 구현 시 필요
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
