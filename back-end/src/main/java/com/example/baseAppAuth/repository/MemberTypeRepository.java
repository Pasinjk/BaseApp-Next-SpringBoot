package com.example.baseAppAuth.repository;

import com.example.baseAppAuth.entity.app.MemberType;
import com.example.baseAppAuth.entity.enums.EMemberType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberTypeRepository extends JpaRepository<MemberType,Long> {
    Optional<MemberType> findByName(EMemberType name);
}
