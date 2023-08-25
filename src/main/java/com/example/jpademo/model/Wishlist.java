package com.example.jpademo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "wishlist")
public class Wishlist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "book-id")
    private int bookId;
    @Column(name = "user-id")
    private String userId;

    public Wishlist(int id, int bookId, String userId) {
        this.id = id;
        this.bookId = bookId;
        this.userId = userId;
    }

    public Wishlist() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "Wishlist{" +
                "id=" + id +
                ", bookId='" + bookId + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
