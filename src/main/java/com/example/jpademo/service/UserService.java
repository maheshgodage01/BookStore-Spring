package com.example.jpademo.service;

import com.example.jpademo.model.User;
import com.example.jpademo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        System.out.println("get AllUsers called");
        return userRepository.findAll();
    }

    public String addUser(User user){
        userRepository.save(user);
        return "Success";
    }
}
