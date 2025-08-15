package com.Athreya.Task01.repository;

import com.Athreya.Task01.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface userRepository extends MongoRepository<User, String> {

    User findByUserId(String userId);

    User findByEmailAndPassword(String email, String password);
    User findByUsernameAndPassword(String username, String password);

    User findByUsername(String username);

    User findByEmail(String username);
}
