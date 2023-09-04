package com.example.jpademo.service;

import com.example.jpademo.model.Cart;
import com.example.jpademo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {
    @Autowired
    CartRepository cartRepository;

    public List<Cart> getAllCart(String userName){
        return cartRepository.findByUserId(userName);
    }
    public String addToCart(Cart cart){
       cartRepository.save(cart);
       cartRepository.flush();
       return "Success";
    }

    public void deleteByBookId(int id) {
        cartRepository.deleteById(id);
    }
}

