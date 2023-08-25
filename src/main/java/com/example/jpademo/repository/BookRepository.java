package com.example.jpademo.repository;

import com.example.jpademo.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {

    public Book findById(int id);
}
