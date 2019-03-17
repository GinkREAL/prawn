package com.thesis.controller;

import com.thesis.model.JobOrder;
import com.thesis.model.JobOrderRepository;
import com.thesis.model.AIResult;
import com.thesis.model.AIResultRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AIController {

	@Autowired
    private JobOrderRepository jobOrderRepository;
    @Autowired
    private AIResultRepository aiResultRepository;

    @RequestMapping(value="/ai/article", method = RequestMethod.POST)
    public HttpStatus postJob(String article) {
        JobOrder jb = new JobOrder(article);
        jobOrderRepository.save(jb);
        return HttpStatus.OK;
    }

    @RequestMapping(value="/ai/article", method=RequestMethod.GET)
    public ResponseEntity<?> getResult(String article){
        AIResult ai = aiResultRepository.findByArticle(article);
        if(ai == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(ai, HttpStatus.OK);
        }
    }
}