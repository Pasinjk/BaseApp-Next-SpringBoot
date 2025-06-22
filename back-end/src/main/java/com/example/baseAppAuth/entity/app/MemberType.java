package com.example.baseAppAuth.entity.app;


import com.example.baseAppAuth.entity.base.BaseEntity;
import com.example.baseAppAuth.entity.enums.EMemberType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;


@Entity
@Data
public class MemberType extends BaseEntity {

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private EMemberType name;

}
