package com.example.jpademo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class Temp {

    @RequestMapping("/all-users")
    public String indexPage(Model model){
        model.addAttribute("userName", "Mahesh G");
        return "all_users";
    }

}
