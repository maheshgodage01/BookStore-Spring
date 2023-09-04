package com.example.jpademo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "deleted-books")
public class DeletedBook {
    @Id
    @Column(name = "id")
    private int id;
    @Column
    private String title;
    @Column(name = "author-name")
    private String authorName;
    @Column(name = "store-name")
    private String storeName;
    @Column
    private int price;
    @Column
    private int discount;
    @Column
    private String category;

    @Column(columnDefinition = "MEDIUMTEXT")
    private String description;
    @Column(name = "book-condition")
    private String condition;
    @Column(name = "book-image")
    private String bookImage;

    public String getBookImage() {
        return bookImage;
    }

    @Override
    public String toString() {
        return "DeletedBook{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", authorName='" + authorName + '\'' +
                ", storeName='" + storeName + '\'' +
                ", price=" + price +
                ", discount=" + discount +
                ", category='" + category + '\'' +
                ", description='" + description + '\'' +
                ", condition='" + condition + '\'' +
                ", bookImage='" + bookImage + '\'' +
                '}';
    }

    public DeletedBook(int id, String title, String authorName, String storeName, int price, int discount, String category, String description, String condition, String bookImage) {
        this.id = id;
        this.title = title;
        this.authorName = authorName;
        this.storeName = storeName;
        this.price = price;
        this.discount = discount;
        this.category = category;
        this.description = description;
        this.condition = condition;
        this.bookImage = bookImage;
    }

    public void setBookImage(String bookImage) {
        this.bookImage = bookImage;
    }

    public DeletedBook() {
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getStoreName() {
        return storeName;
    }

    public void setStoreName(String storeName) {
        this.storeName = storeName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }
}
