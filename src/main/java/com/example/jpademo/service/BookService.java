package com.example.jpademo.service;

import com.example.jpademo.model.Book;
import com.example.jpademo.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class BookService {
    @Autowired
    BookRepository bookRepository;

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public Book getBookById(int bookId){
        return bookRepository.findById(bookId);
    }

    public String addBook(Book book){
        bookRepository.save(book);
        bookRepository.flush();
        return "success";
    }

    public void deleteBookById(int id) {
        bookRepository.deleteById(id);
    }
}
