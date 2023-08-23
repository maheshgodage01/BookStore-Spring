package com.example.jpademo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "admin-user")
public class User {
    @Id
    @Column(name = "contact")
    private String contactNumber;
    @Column(name = "fullname")
    private String fullName;
    @Column(name = "email")
    private String emailId;
    @Column(name = "alternate-contact")
    private String alternateContact;
    @Column(name = "password")
    private String password;

    public User(String contactNumber, String fullName, String emailId, String alternateContact, String password) {
        this.contactNumber = contactNumber;
        this.fullName = fullName;
        this.emailId = emailId;
        this.alternateContact = alternateContact;
        this.password = password;
    }



    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public String getEmailId() {
        return emailId;
    }


    public String getAlternateContact() {
        return alternateContact;
    }


    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }


    public void setAlternateContact(String alternateContact) {
        this.alternateContact = alternateContact;
    }




    public User(){

    }

    @Override
    public String toString() {
        return "User{" +
                "contactNumber='" + contactNumber + '\'' +
                ", fullName='" + fullName + '\'' +
                ", emailId='" + emailId + '\'' +
                ", alternateContact='" + alternateContact + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
