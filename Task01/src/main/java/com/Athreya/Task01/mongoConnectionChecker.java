package com.Athreya.Task01;

import com.mongodb.client.MongoClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class mongoConnectionChecker implements CommandLineRunner {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Override
    public void run(String... args) {
        try {
            mongoTemplate.executeCommand("{ ping: 1 }");
            System.out.println("mongo connection ok");
        } catch (Exception e) {
            System.out.println("mongo connection failed");
        }
    }

}
