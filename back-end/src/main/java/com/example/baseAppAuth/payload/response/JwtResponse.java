package com.example.baseAppAuth.payload.response;


import com.example.baseAppAuth.entity.app.MemberType;
import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String firstName;
    private String lastName;
    private String email;
    private Long id;
    private String username;
    private String token;
    private String type = "Bearer";
    private MemberType memberType;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String username, String firstName, String lastName, String email, MemberType memberType, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.memberType = memberType;
        this.roles = roles;
    }
}
