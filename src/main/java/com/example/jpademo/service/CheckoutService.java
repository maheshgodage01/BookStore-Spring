package com.example.jpademo.service;

import com.example.jpademo.model.CheckOut;
import com.example.jpademo.repository.CheckOutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CheckoutService {
    @Autowired
    CheckOutRepository checkOutRepository;

    public String addCheckOut(CheckOut checkOut){
        checkOutRepository.save(checkOut);
        return "Success";
    }

    public List<CheckOut> getAllOrders(String userId) {
        return checkOutRepository.findAllByUserId(userId);
    }
}
