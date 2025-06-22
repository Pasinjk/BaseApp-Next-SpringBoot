package com.example.baseAppAuth.entity.app;


import com.example.baseAppAuth.entity.base.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NonNull;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
public class User extends BaseEntity {

    @NonNull
    @Column(unique = true)
    private String username;

    @NonNull
    @JsonIgnore
    private  String password;

    @NonNull
    private String firstName;

    @NonNull
    private String  lastName;

    @NonNull
    @Column(unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberType")
    private MemberType memberType;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

}
