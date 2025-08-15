package com.Athreya.Task01.dto;


public class LoginUser {
    String identifier;
    String password;

    public String getIdentifier() {
        return identifier;
    }

    public void setIdentifier(String identifier) {
        this.identifier = identifier;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginUser{" +
                "identifier='" + identifier + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
