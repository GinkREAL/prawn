package com.thesis.model;

import java.util.Collection;
import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Document(value="users")
public class User implements UserDetails{
    @Id
    private String id;
    private String username;
    private String password;
    private String role;
    private boolean endorsed;

    public User(String username, String password, String role, boolean endorsed){
        this.username = username;
        this.password = password;
        this.role = role;
        this.endorsed = endorsed;
    }

    public Collection<? extends GrantedAuthority> getAuthorities(){ //does not work
        ArrayList<SimpleGrantedAuthority> ar = new ArrayList<SimpleGrantedAuthority>();
        ar.add(new SimpleGrantedAuthority(role));
        return ar;
    }

    public String getRole(){
        return role;
    }

    public String getPassword(){
        return password;
    }

    public String getUsername(){
        return username;
    }

    public boolean isEndorsed(){
        return endorsed;
    }

    public boolean isAccountNonExpired(){
        return true;
    }

    public boolean isAccountNonLocked(){
        return true;
    }

    public boolean isCredentialsNonExpired(){
        return true;
    }

    public boolean isEnabled(){
        return true;
    }

    public void setPassword(String password){
        this.password = password;
    }
}