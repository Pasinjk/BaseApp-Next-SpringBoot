package com.example.baseAppAuth.repository;


import com.example.baseAppAuth.entity.app.Role;
import com.example.baseAppAuth.entity.enums.ERole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Optional<Role> findByName(ERole name);
}
