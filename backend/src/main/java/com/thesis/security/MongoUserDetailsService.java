package com.thesis.security;

import com.thesis.model.User;
import com.thesis.model.UserRepository;

import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class MongoUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;
    //username: admin, password: $2a$10$p2Di4mLn5ftKAnnpT9gfDuh6jbCIXGHll5Aw2O3sNaV6486mYcwlO

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        System.out.println(userRepository == null);
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException("Username not found");
        }
        return user;
    }
}