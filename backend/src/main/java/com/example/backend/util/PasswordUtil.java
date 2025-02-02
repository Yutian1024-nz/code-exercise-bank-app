package com.example.backend.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordUtil {
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // encode raw password
    public static String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    // check if raw password matches encoded password
    public static boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }


    public static void main(String[] args) {
        String rawPassword = "123456";
        String hashedPassword = PasswordUtil.encodePassword(rawPassword);

        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Hashed Password: " + hashedPassword);

        boolean isMatch = PasswordUtil.matches(rawPassword, hashedPassword);
        System.out.println("Password Matches: " + isMatch);
    }

}
