package com.example.jpademo.controller;

import com.example.jpademo.model.Book;
import com.example.jpademo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("")
public class BookController {
    @Autowired
    BookService bookService;

    @GetMapping("all-books")
    public List<Book> getAllBooks(){
        return bookService.getAllBooks();
    }

    @PostMapping("add")
    public String addBook(@RequestBody Book book){
        return bookService.addBook(book);
    }

}
