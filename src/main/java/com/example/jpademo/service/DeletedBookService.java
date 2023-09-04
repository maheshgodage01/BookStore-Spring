package com.example.jpademo.service;

import com.example.jpademo.model.DeletedBook;
import com.example.jpademo.repository.DeletedBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeletedBookService {
    @Autowired
    DeletedBookRepository deletedBookRepository;

    public String addBook(DeletedBook book){
        deletedBookRepository.save(book);
        return "Success";
    }
}
