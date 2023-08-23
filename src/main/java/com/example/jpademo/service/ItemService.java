package com.example.jpademo.service;

import com.example.jpademo.model.Item;
import com.example.jpademo.model.User;
import com.example.jpademo.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> getAllBooks() {
        System.out.println("get AllUsers called");
        System.out.println(itemRepository.findAll());
        return itemRepository.findAll();
    }

    public String addBook(Item item) {
        itemRepository.save(item);
        return "Added Successfully...";
    }
}

