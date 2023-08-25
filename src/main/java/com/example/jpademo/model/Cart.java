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

    public Cart(int id, String userId, int bookId) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
    }
    public Cart(){}

    @Override
    public String toString() {
        return "Cart{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", bookId=" + bookId +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
}



