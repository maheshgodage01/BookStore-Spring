package com.example.jpademo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "item")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "book_name")
    private String bookName;
    @Column(name = "author_name")
    private String authorName;
    @Column(name = "price")
    private Long price;
    @Column(name = "discount")
    private int discount;
    @Column(name = "description")
    private String description;


    public int getId() {
        return id;
    }
    public String getBookName() {
        return bookName;
    }

    public String getAuthorName() {
        return authorName;
    }

    public Long getPrice() {
        return price;
    }

    public int getDiscount() {
        return discount;
    }

    public String getDescription() {
        return description;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Item(int id,String bookName, String authorName, Long price, int discount, String description) {
        this.id=id;
        this.bookName = bookName;
        this.authorName = authorName;
        this.price = price;
        this.discount = discount;
        this.description = description;


    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", bookName='" + bookName + '\'' +
                ", authorName='" + authorName + '\'' +
                ", price=" + price +
                ", discount=" + discount +
                ", description='" + description + '\'' +
                '}';
    }

    public Item(){}
}
