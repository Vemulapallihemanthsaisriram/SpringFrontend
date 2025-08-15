package com.Athreya.Task01.service;

import com.Athreya.Task01.dto.GeneralUser;
import com.Athreya.Task01.dto.LoginUser;
import com.Athreya.Task01.model.User;
import com.Athreya.Task01.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class userService {

    @Autowired
    private userRepository repo;

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(10);

    public User registerNewUser(User user) {
        if (user.getUserId() == null) {
            user.setUserId(UUID.randomUUID());
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }


    public User registerGeneralUser(GeneralUser user) {
        if (user.getUserId() == null) {
            user.setUserId(UUID.randomUUID());
        }
        user.setPassword(encoder.encode(user.getPassword()));

        User newUser = new User();
        newUser.setUserId(user.getUserId());
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword());

        return repo.save(newUser);
    }

    public String verifyUser(LoginUser user) {
        Authentication authentication =
                authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getIdentifier(), user.getPassword()));

        if(authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getIdentifier());
        }
        return null;
    }

    public User getUserByToken(String token) {
        String identifier = jwtService.extractToken(token);
        return repo.findByUsername(identifier);
    }
}