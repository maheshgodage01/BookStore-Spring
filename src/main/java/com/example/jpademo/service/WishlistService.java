package com.example.jpademo.service;

import com.example.jpademo.model.Wishlist;
import com.example.jpademo.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WishlistService {
    @Autowired
    WishlistRepository wishlistRepository;

    public List<Wishlist> getAllWishlist(String userName){
        return wishlistRepository.findByUserId(userName);
    }

    public void addToWishlist(Wishlist wishlist){
        wishlistRepository.save(wishlist);
    }

    public void deleteById(int bookId) {
        System.out.println("Delete by id called");
        wishlistRepository.deleteById(bookId);
    }

    public void deleteByBookId(int id) {
        wishlistRepository.deleteById(id);
    }
}


