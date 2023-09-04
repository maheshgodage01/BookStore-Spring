package com.example.jpademo.repository;

import com.example.jpademo.model.CheckOut;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckOutRepository extends JpaRepository<CheckOut, Integer> {

    List<CheckOut> findAllByUserId(String userId);
}
