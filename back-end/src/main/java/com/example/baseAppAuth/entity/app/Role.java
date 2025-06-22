package com.example.baseAppAuth.entity.app;


import com.example.baseAppAuth.entity.base.BaseEntity;
import com.example.baseAppAuth.entity.enums.ERole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "roles")
@Data
public class Role extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;
}
