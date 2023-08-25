package com.example.jpademo.controller;

import com.example.jpademo.model.Login;
import com.example.jpademo.model.User;
import com.example.jpademo.service.UserService;
import org.apache.tomcat.util.net.jsse.JSSEUtil;
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

    @PostMapping("/check-user")
    @ResponseBody
    public Boolean checkUser(@RequestBody String userName){
        List<User> users = userService.getAllUsers();
        System.out.println("inside Check User:"+userName);


        for(User user: users){
            System.out.println(user.getContactNumber());
            if(Objects.equals(userName, user.getContactNumber())){
                System.out.println(userName +" Already Exist");
                return true;
            }
        }
        return  false;
    }

    @PostMapping("/login")
    @ResponseBody
    public String getAllUsers(@RequestBody Login login){
        List<User> users = userService.getAllUsers();
        System.out.println(login);

        for(User user: users){
            System.out.println("inside Login Check:"+login.getUserName()+"=="+user.getContactNumber());
            if(Objects.equals(login.getUserName(), user.getContactNumber())){
                System.out.println();
                if(Objects.equals(user.getPassword(), login.getPassWord())){
                    return "True";
                }else {
                    return "TrueFalse";
                }
            }

        }
        System.out.println("all users");
        return "False";
    }

    @PostMapping("/signup")
    @ResponseBody
    public User setUser(@RequestBody User user){
        userService.addUser(user);
        return user;
    }

}
