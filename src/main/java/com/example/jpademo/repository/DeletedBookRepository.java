package com.example.jpademo.repository;

import com.example.jpademo.model.DeletedBook;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeletedBookRepository extends JpaRepository<DeletedBook, Integer> {
}
