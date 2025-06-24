package com.example.baseAppAuth.controllers;

import com.example.baseAppAuth.entity.app.MemberType;
import com.example.baseAppAuth.entity.app.Role;
import com.example.baseAppAuth.entity.app.User;
import com.example.baseAppAuth.entity.enums.EMemberType;
import com.example.baseAppAuth.entity.enums.ERole;
import com.example.baseAppAuth.payload.request.SigninRequest;
import com.example.baseAppAuth.payload.request.SignupRequest;
import com.example.baseAppAuth.payload.response.JwtResponse;
import com.example.baseAppAuth.payload.response.MessageResponse;
import com.example.baseAppAuth.repository.MemberTypeRepository;
import com.example.baseAppAuth.repository.RoleRepository;
import com.example.baseAppAuth.repository.UserRepository;
import com.example.baseAppAuth.security.services.UserDetailsImpl;
import com.example.baseAppAuth.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.baseAppAuth.entity.enums.EMemberType.ADMIN;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {
    private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyyMMdd", Locale.US);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    MemberTypeRepository memberTypeRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtil jwtUtil;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody SigninRequest req) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtil.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getFirstName(),
                userDetails.getLastName(),
                userDetails.getEmail(),
                userDetails.getMemberType(),
                roles));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest req){
        if (userRepository.existsByUsername(req.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Username is already taken!","400","error",null));
        }

        if (userRepository.existsByEmail(req.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("email is already in use!","400","error",null));
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(encoder.encode(req.getPassword()));
        user.setEmail(req.getEmail());
        user.setFirstName(req.getFirstName());
        user.setLastName(req.getLastName());

        String strMemberType = req.getMemberType();

        if (strMemberType == null) {
            MemberType typeWorker = memberTypeRepository.findByName(EMemberType.MEMBER)
                    .orElseThrow(() -> new RuntimeException("Member type 'WORKER' not found"));
            user.setMemberType(typeWorker);
        } else {
            switch (strMemberType) {
                case "manager":
                    MemberType typeManager = memberTypeRepository.findByName(EMemberType.MANAGER)
                            .orElseThrow(() -> new RuntimeException("Member type 'WORKER' not found"));
                    user.setMemberType(typeManager);
                    break;
                case "admin":
                    MemberType typeAdmin = memberTypeRepository.findByName(EMemberType.ADMIN)
                            .orElseThrow(() -> new RuntimeException("Member type 'WORKER' not found"));
                    user.setMemberType(typeAdmin);
                case "member":
                    MemberType typeMember = memberTypeRepository.findByName(EMemberType.MEMBER)
                            .orElseThrow(() -> new RuntimeException("Member type 'WORKER' not found"));
                    user.setMemberType(typeMember);
                    break;
            }
        }


        Set<String> strRoles = req.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                if (role.equals("admin")) {
                    Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                            .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                    roles.add(adminRole);
                }else {
                Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully.","200","success",user));

    }
}
