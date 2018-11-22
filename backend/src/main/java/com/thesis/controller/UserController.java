package com.thesis.controller;

import com.thesis.model.User;
import com.thesis.model.UserRepository;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;


@RestController
public class UserController {

	@Autowired
	private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @RequestMapping(value="/api/user", method = RequestMethod.POST)
    public HttpStatus signup(String username, String password) {


        if(userRepository.existsByUsername(username)){
            return HttpStatus.BAD_REQUEST;
        }

        String requesterName = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User requester = userRepository.findByUsername(requesterName);
        if(!requester.getRole().equals("ROLE_ADMIN")){
            System.out.println(requester.getRole());
            return HttpStatus.FORBIDDEN;
        }
        password = passwordEncoder.encode(password);
        User newuser = new User(username, password, "ROLE_USER");
        userRepository.save(newuser);

        if(userRepository.existsByUsername(username)){
            return HttpStatus.CREATED;
        } else {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    @RequestMapping(value="/api/user", method = RequestMethod.GET)
    public ResponseEntity<?> session(){
        HashMap<String,String> response = new HashMap<String,String>();
        response.put("username", (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(value="/api/user", method = RequestMethod.PUT) //changing username not allowed yet
    public HttpStatus changePassword(String oldPassword, String newPassword){
        String requester = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(requester);
        
        if(passwordEncoder.matches(oldPassword, user.getPassword())){
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return HttpStatus.OK;
        } else {
            return HttpStatus.UNAUTHORIZED;
        }
    }
}