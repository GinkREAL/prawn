package com.thesis.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

@Controller
public class RedirectController {
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect(){
        return "forward:/";
    }
}