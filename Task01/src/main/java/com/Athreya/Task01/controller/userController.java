package com.Athreya.Task01.controller;

import com.Athreya.Task01.dto.GeneralUser;
import com.Athreya.Task01.dto.LoginUser;
import com.Athreya.Task01.model.User;
import com.Athreya.Task01.service.userService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;


@RestController
public class userController {

    @Autowired
    userService userService;


    @RequestMapping("/")
    public String index(HttpServletRequest request) {
        String sessionId = request.getSession().getId();
        return "<center><h1>Spring Boot is Running</h1></center><br><center><h1>" + sessionId + "</h1></center>";
    }

    @PostMapping("/api/register-generaluser")
    public ResponseEntity<?> registerNewUser(@RequestBody GeneralUser user) {
        System.out.println(user);
        User savedUser = userService.registerGeneralUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/api/register")
    public ResponseEntity<?> registerNewUser(
            @RequestParam("email") String email,
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam("profilePic") MultipartFile file) {
        try {
            String uploadDir = "uploads/";
            File dir = new File(uploadDir);
            if (!dir.exists()) dir.mkdirs();

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.copy(file.getInputStream(), path);

            User user = new User();
            user.setEmail(email);
            user.setUsername(username);
            user.setPassword(password);
            user.setProfilePicPath(fileName);

            User savedUser = userService.registerNewUser(user);
            savedUser.setPassword(null);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error while registering user");
        }
    }

    @GetMapping("/api/users")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PostMapping("/api/login-user")
    public String findUserByEmailAndPassword(@RequestBody LoginUser user) {
        return userService.verifyUser(user);
    }


    @GetMapping("/api/get-user/{token}")
    public User getUserByToken(@PathVariable String token) {
        User user = userService.getUserByToken(token);
        user.setPassword(null);
        return user;
    }
}
