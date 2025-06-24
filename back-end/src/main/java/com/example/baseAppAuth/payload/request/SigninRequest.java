package com.example.baseAppAuth.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SigninRequest {

    @NotBlank
    String username;

    @NotBlank
    String password;
}
