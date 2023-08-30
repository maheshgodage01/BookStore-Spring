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

    @GetMapping("/admin-editItem")
    public String adminEditItem(){
        return "admin-editItem";
    }
    @GetMapping("/wishlist")
    public String wishList(){
        return "wishlist";
    }
    @GetMapping("/my-cart")
    public String myCart(){
        return "mycart";
    }

    @GetMapping("payment")
    public String payment(){
        return "Payment";
    }




//    @PostMapping("/api/signup")
//    @ResponseBody
//    public User signUpForm(@RequestBody User user){
//        System.out.println(user);
//        return user;
//    }
}
