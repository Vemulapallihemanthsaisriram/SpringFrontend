package com.Athreya.Task01.service;

import com.Athreya.Task01.model.User;
import com.Athreya.Task01.model.UserPrincipal;
import com.Athreya.Task01.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private userRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user1 = repo.findByUsername(username);

        User user2 = repo.findByEmail(username);

        if(user1 == null && user2 == null) {
            System.out.println("user not found");
            throw new UsernameNotFoundException("User not found");
        }

        if(user1 != null) {
            return new UserPrincipal(user1);
        }
        return new UserPrincipal(user2);

    }
}
