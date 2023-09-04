package com.example.jpademo.model;

import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "checkout")
public class CheckOut {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "user-id")
    private String userId;
    private String books;
    private String status;

    public CheckOut() {
    }
    @Override
    public String toString() {
        return "CheckOut{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", books=" + books +
                ", status='" + status + '\'' +
                '}';
    }

    public CheckOut(int id, String userId, String books, String status) {
        this.id = id;
        this.userId = userId;
        this.books = books;
        this.status = status;
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

    public String getBooks() {
        return books;
    }

    public void setBooks(String books) {
        this.books = books;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}


