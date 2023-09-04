package com.example.jpademo.controller;

import com.example.jpademo.model.Book;
import com.example.jpademo.model.Cart;
import com.example.jpademo.model.DeletedBook;
import com.example.jpademo.model.Wishlist;
import com.example.jpademo.service.BookService;
import com.example.jpademo.service.CartService;
import com.example.jpademo.service.DeletedBookService;
import com.example.jpademo.service.WishlistService;
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
    @Autowired
    DeletedBookService deletedBookService;

    @Autowired
    CartService cartService;

    @Autowired
    WishlistService wishlistService;

    @PostMapping("all-books")
    @ResponseBody
    public ResponseEntity<List<Map<String, String>>> homePageBooks(@RequestBody String userName) throws IOException {
        List<Book> books = bookService.getAllBooks();
        List<Map<String, String>> bookList = new ArrayList<>();
        for (Book book : books){
            if(!Objects.equals(book.getAdminId(), userName))
                bookList.add(extractBook(book));
        }
        return ResponseEntity.ok(bookList);
    }

    @PostMapping("all-all-books")
    @ResponseBody
    public ResponseEntity<List<Map<String, String>>> homePageBooks() throws IOException {
        List<Book> books = bookService.getAllBooks();
        List<Map<String, String>> bookList = new ArrayList<>();
        for (Book book : books){
                if(book == null){
                    continue;
                }
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
            if(book == null){
                continue;
            }
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
            @RequestParam("condition") String condition,
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
        book.setCondition(condition);
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


    @PostMapping("my-store/update")
    @ResponseBody
    public Book update(
            @RequestParam("id") int id,
            @RequestParam("title") String title,
            @RequestParam("authorName") String authorName,
            @RequestParam("storeName") String storeName,
            @RequestParam("price") int price,
            @RequestParam("discount") int discount,
            @RequestParam("category") String category,
            @RequestParam("condition") String condition,
            @RequestParam("description") String description,
            @RequestParam("adminId") String adminId){

        Book book = bookService.getBookById(id);

        System.out.println("add book function");
        book.setTitle(title);
        book.setAuthorName(authorName);
        book.setStoreName(storeName);
        book.setPrice(price);
        book.setDiscount(discount);
        book.setCategory(category);
        book.setCondition(condition);
        book.setDescription(description);
        book.setAdminId(adminId);


        System.out.println(book);

        bookService.addBook(book);

        return book;
    }
    @PostMapping("my-store/delete")
    @ResponseBody
    public String deleteBook(@RequestParam("id") int id){
        Book book = bookService.getBookById(id);
        DeletedBook deletedBook = new DeletedBook();
        deletedBook.setId(book.getId());
        deletedBook.setTitle(book.getTitle());
        deletedBook.setAuthorName(book.getAuthorName());
        deletedBook.setCategory(book.getCategory());
        deletedBook.setDescription(book.getDescription());
        deletedBook.setStoreName(book.getStoreName());
        deletedBook.setCondition(book.getCondition());
        deletedBook.setPrice(book.getPrice());
        deletedBook.setDiscount(book.getDiscount());
        deletedBook.setBookImage(book.getBookImage());

        deletedBookService.addBook(deletedBook);

        bookService.deleteBookById(id);
        return "Deleted";
    }
    @PostMapping("/api/remove-from-cart")
    @ResponseBody
    public String removeFromCart(@RequestParam("bookId") int bookId, @RequestParam("userName") String userName){
        List<Cart> myCart = cartService.getAllCart(userName);

        for(Cart cart: myCart){
            if(cart.getBookId() == bookId){
                cartService.deleteByBookId(cart.getId());
                return "Success";
            }
        }
        return  "Not fount";

    }

    @PostMapping("/api/remove-from-wishlist")
    @ResponseBody
    public String removeFromWishlist(@RequestParam("bookId") int bookId, @RequestParam("userName") String userName){
        List<Wishlist> allWishlist = wishlistService.getAllWishlist(userName);

        for(Wishlist wishlist: allWishlist){
            if(wishlist.getBookId() == bookId){
                wishlistService.deleteByBookId(wishlist.getId());
                return "Success";
            }
        }
        return  "Not fount";

    }




    @PostMapping("api/my-cart")
    @ResponseBody
    public ResponseEntity<List<Map<String, String>>> getMyCart(@RequestBody String userName) throws IOException {
        List<Book> allBooks = bookService.getAllBooks();
        List<Cart> allCart = cartService.getAllCart(userName);
        List<Map<String, String>> userBooks = new ArrayList<>();
        System.out.println(userName);
        System.out.println(allCart);

        System.out.println(allCart);
        for (Cart cart : allCart){
            int bookId = cart.getBookId();
            Book book = bookService.getBookById(bookId);
            if(book != null)
                userBooks.add(extractBook(book));
        }
        return ResponseEntity.ok(userBooks);
    }

    @PostMapping("api/get-all-cart")
    @ResponseBody
    public List<Integer> getAllCartId(@RequestBody String userName){
        List<Integer> allCartId = new ArrayList<>();
        List<Cart> allCart = cartService.getAllCart(userName);
        for (Cart cart: allCart){
            allCartId.add(cart.getBookId());
        }
        return allCartId;
    }

    @PostMapping("api/get-all-wishlist")
    @ResponseBody
    public List<Integer> getAllWishlist(@RequestBody String userName){
        List<Integer> allWishlistId = new ArrayList<>();
        List<Wishlist> allWishlist = wishlistService.getAllWishlist(userName);
        for (Wishlist wishlist: allWishlist){
            allWishlistId.add(wishlist.getBookId());
        }
        return allWishlistId;
    }

    @PostMapping("api/my-wishlist")
    @ResponseBody
    public ResponseEntity<List<Map<String, String>>> getMyWishlist(@RequestBody String userName) throws IOException {
        List<Book> allBooks = bookService.getAllBooks();
        List<Wishlist> allWishlist = wishlistService.getAllWishlist(userName);
        List<Map<String, String>> userBooks = new ArrayList<>();
        System.out.println(userName);
        System.out.println(allWishlist);

        System.out.println(allWishlist);
        for (Wishlist wishlist : allWishlist){
            int bookId = wishlist.getBookId();
            Book book = bookService.getBookById(bookId);
            if(book != null)
                userBooks.add(extractBook(book));
        }
        return ResponseEntity.ok(userBooks);
    }

    @PostMapping("api/get-book")
    @ResponseBody
    public ResponseEntity<Map<String, String>> getBook(@RequestParam("id") int id) throws IOException {
        System.out.println(id);
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(extractBook(book));
    }

    @PostMapping("api/add-to-cart")
    @ResponseBody
    public Boolean addToCart(@RequestParam String userId, @RequestParam int bookId){
        System.out.println(userId+" "+bookId);

        List<Cart> allCart = cartService.getAllCart(userId);

        for (Cart cart: allCart){
            System.out.println(cart.getBookId()+"=="+bookId);
            if(cart.getBookId()==bookId){
                return false;
            }
        }
        Cart cart = new Cart();
        cart.setBookId(bookId);
        cart.setUserId(userId);
        cartService.addToCart(cart);
        return true;
    }

    @PostMapping("api/add-to-wishlist")
    @ResponseBody
    public Boolean addToWishlist(@RequestParam String userId, @RequestParam int bookId){
        System.out.println(userId+" "+bookId);
        List<Wishlist> allWishlist = wishlistService.getAllWishlist(userId);

        for (Wishlist wishlist: allWishlist){
            if(wishlist.getBookId()==bookId){
                wishlistService.deleteById(wishlist.getId());
                return false;
            }
        }
        System.out.println("still in function");
        Wishlist wishlist = new Wishlist();
        wishlist.setBookId(bookId);
        wishlist.setUserId(userId);
        wishlistService.addToWishlist(wishlist);
        return true;
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