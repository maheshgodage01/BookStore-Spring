package com.example.jpademo.controller;

import com.example.jpademo.model.Book;
import com.example.jpademo.model.CheckOut;
import com.example.jpademo.model.Wishlist;
import com.example.jpademo.service.BookService;
import com.example.jpademo.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.*;

@RestController
@RequestMapping("/checkout")
public class CheckOutController {
    @Autowired
    CheckoutService checkoutService;

    @Autowired
    BookService bookService;

    @PostMapping("/place-order")
    @ResponseBody
    public String placeOrder(@RequestParam String userId, @RequestParam String books, @RequestParam String status){
        System.out.println("Entered in Checkout");
        CheckOut checkOut = new CheckOut();
        checkOut.setBooks(books);
        checkOut.setStatus(status);
        checkOut.setUserId(userId);
        checkoutService.addCheckOut(checkOut);
        return "Success";
    }
    @PostMapping("/my-orders")
    @ResponseBody
    public ResponseEntity<List<Map<String, String>>> myOrders(@RequestBody String userId) throws IOException {

        List<Book> allBooks = bookService.getAllBooks();
        List<CheckOut> allCheckOuts = checkoutService.getAllOrders(userId);
        List<Map<String, String>> userOrders = new ArrayList<>();
        System.out.println(userId);

        for(CheckOut checkOut: allCheckOuts){
            String[] allBookId = checkOut.getBooks().split(",");
            for(String bookId: allBookId){
                Book book = bookService.getBookById(Integer.parseInt(bookId));
                if(book != null){
                    userOrders.add(extractBook(book));
                }
            }
        }


        return ResponseEntity.ok(userOrders);
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
        response.put("condition", book.getCondition());


        File imageFile = new File(book.getBookImage());
        byte[] imageData = Files.readAllBytes(imageFile.toPath());
        String base64Image = Base64.getEncoder().encodeToString(imageData);

        response.put("bookImage", base64Image);

        return response;
    }
}

