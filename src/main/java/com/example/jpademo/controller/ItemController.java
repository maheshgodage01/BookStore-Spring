package com.example.jpademo.controller;

import com.example.jpademo.model.Item;
import com.example.jpademo.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @GetMapping("all_items")
    public List<Item> getAllBooks() {
        List<Item> items = itemService.getAllBooks();
        System.out.println(items);
        System.out.println("GetMapping called");
        return items;
    }
    // Endpoint to add a new book
    @PostMapping("add")
    public String addBook(@RequestBody Item item) {
        System.out.println("PostMapping called");
        System.out.println(item);
        return itemService.addBook(item);
    }
}
