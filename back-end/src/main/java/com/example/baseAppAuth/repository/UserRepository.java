package com.example.baseAppAuth.repository;

import com.example.baseAppAuth.entity.app.Role;
import com.example.baseAppAuth.entity.app.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String username);

    List<User> findByRoles(Role role);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

}
