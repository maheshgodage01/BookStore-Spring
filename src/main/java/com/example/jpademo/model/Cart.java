package com.example.jpademo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "user-id")
    private String userId;
    @Column(name = "book-id")
    private int bookId;

}



