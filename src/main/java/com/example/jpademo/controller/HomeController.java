package com.example.jpademo.controller;

import com.example.jpademo.model.User;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class HomeController {
    @GetMapping("/")
    public String homeController(){
        return "index";
    }

    @GetMapping("/signup")
    public String signUp(){
        return "signup";
    }

    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @GetMapping("/my-store")
    public String admin(){
        return "admin";
    }

//    @PostMapping("/api/signup")
//    @ResponseBody
//    public User signUpForm(@RequestBody User user){
//        System.out.println(user);
//        return user;
//    }
}
