package com.example.jpademo.repository;

import com.example.jpademo.model.Cart;
import org.hibernate.type.descriptor.converter.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByUserId(String userId);

    void deleteById(int id);
}
