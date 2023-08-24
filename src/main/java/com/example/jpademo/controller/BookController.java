package com.example.jpademo.controller;

import com.example.jpademo.model.Book;
import com.example.jpademo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

@RestController
@RequestMapping("/")
public class BookController {
    @Autowired
    BookService bookService;

    @PostMapping("all-books")
    @ResponseBody
    public ResponseEntity<List<Map<String, String>>> homePageBooks() throws IOException {
        List<Book> books = bookService.getAllBooks();
        List<Map<String, String>> bookList = new ArrayList<>();
        for (Book book : books){
            bookList.add(extractBook(book));
        }
        return ResponseEntity.ok(bookList);
    }

    @PostMapping("my-store/books")
    @ResponseBody
    public ResponseEntity<List<Map<String, String>>> getAllBooks(@RequestBody String currentUser) throws IOException {
        List<Book> allBooks = bookService.getAllBooks();
        List<Map<String, String>> userBooks = new ArrayList<>();
        System.out.println(currentUser);

        for (Book book : allBooks){
            System.out.println(book.getAdminId());
            if(Objects.equals(book.getAdminId(), currentUser)){
                userBooks.add(extractBook(book));

            }
        }
        return ResponseEntity.ok(userBooks);
    }

    @PostMapping("my-store/add")
    @ResponseBody
    public Book addBook(
            @RequestParam("title") String title,
            @RequestParam("authorName") String authorName,
            @RequestParam("storeName") String storeName,
            @RequestParam("price") int price,
            @RequestParam("discount") int discount,
            @RequestParam("category") String category,
            @RequestParam("description") String description,
            @RequestParam("filePath") String filePath,
            @RequestParam("adminId") String adminId,
            @RequestParam("bookImage") MultipartFile multipartFile){

        Book book = new Book();
        System.out.println("add book function");
        book.setTitle(title);
        book.setAuthorName(authorName);
        book.setStoreName(storeName);
        book.setPrice(price);
        book.setDiscount(discount);
        book.setCategory(category);
        book.setDescription(description);
        book.setAdminId(adminId);

        String imageName = generateFileName(filePath);

        try {
            byte[] imageBytes = multipartFile.getBytes();

            Path imagePath = Path.of(System.getProperty("user.dir"), "src","main","resources","static","Books", imageName);
            book.setBookImage(imagePath.toString());
            Files.write(imagePath, imageBytes);
        }
        catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(book);

        bookService.addBook(book);

        return book;
    }

    public Map<String, String> extractBook(Book book) throws IOException {
        Map<String, String> response = new HashMap<>();

        response.put("id", Integer.toString(book.getId()));
        response.put("title", book.getTitle());
        response.put("adminId", book.getAdminId());
        response.put("authorName", book.getAuthorName());
        response.put("storeName", book.getStoreName());
        response.put("price", Integer.toString(book.getPrice()));
        response.put("discount", Integer.toString(book.getDiscount()));
        response.put("description", book.getDescription());
        response.put("category", book.getCategory());

        File imageFile = new File(book.getBookImage());
        byte[] imageData = Files.readAllBytes(imageFile.toPath());
        String base64Image = Base64.getEncoder().encodeToString(imageData);

        response.put("bookImage", base64Image);

        return response;
    }





    private String generateFileName(String filePath) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder sb = new StringBuilder(10);
        String ext = filePath.split("\\.")[1];

        for (int i = 0; i < 10; i++) {
            int randomIndex = random.nextInt(characters.length());
            char randomChar = characters.charAt(randomIndex);
            sb.append(randomChar);
        }
        System.out.println(sb+"."+ext);
        return sb+"."+ext;
    }
}