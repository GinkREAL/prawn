package com.thesis.controller;

import com.thesis.model.JobOrder;
import com.thesis.model.JobOrderRepository;
import com.thesis.model.AIResult;
import com.thesis.model.AIResultRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AIController {

	@Autowired
    private JobOrderRepository jobOrderRepository;
    @Autowired
    private AIResultRepository aiResultRepository;

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/ai/article", method = RequestMethod.POST)
    public HttpStatus postJob(String article) {
        System.out.println("posted job: " + article);
        if(article == null){
            System.out.println("Bad request");
            return HttpStatus.BAD_REQUEST;
        }
        JobOrder jb = jobOrderRepository.findByArticle(article);
        if(jb == null){
            jb = new JobOrder(article);
            jobOrderRepository.save(jb);
            System.out.println("Saved");
            return HttpStatus.OK;
        } else {
            return HttpStatus.BAD_REQUEST;
        }
    }

    @CrossOrigin(origins = "*")
    @RequestMapping(value="/ai/article", method=RequestMethod.GET)
    public ResponseEntity<?> getResult(String article){
        System.out.println("Get result");
        AIResult ai = aiResultRepository.findByArticle(article);
        if(ai == null){
            JobOrder jb = jobOrderRepository.findByArticle(article);
            if(jb == null){
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(HttpStatus.ALREADY_REPORTED);
            }
        } else {
            return new ResponseEntity<>(ai, HttpStatus.OK);
        }
    }
}