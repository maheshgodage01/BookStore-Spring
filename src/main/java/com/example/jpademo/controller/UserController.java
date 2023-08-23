package com.example.jpademo.controller;

import com.example.jpademo.model.Login;
import com.example.jpademo.model.User;
import com.example.jpademo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    @ResponseBody
    public Boolean getAllUsers(@RequestBody Login login){
        List<User> users = userService.getAllUsers();
        System.out.println(login);

        for(User user: users){
            if(Objects.equals(login.getUserName(), user.getContactNumber())){
                return Objects.equals(user.getPassword(), login.getPassWord());
            }
        }
        System.out.println("all users");
        return  false;
    }

    @PostMapping("/signup")
    @ResponseBody
    public User setUser(@RequestBody User user){
        userService.addUser(user);
        return user;
    }

}
