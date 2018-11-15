package com.thesis.controller;

import javax.servlet.http.HttpServletRequest;

import com.thesis.model.Article;
import com.thesis.model.Comment;
import com.thesis.model.ArticleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;


@RestController
public class ArticleController {

	@Autowired
	private ArticleRepository articleRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

	@GetMapping(value = "/fullrandom")
	public ResponseEntity<?> fullrandom() {
        SampleOperation random = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(random);
        AggregationResults<Article> output = mongoTemplate.aggregate(aggregation, "articles", Article.class);
		return new ResponseEntity<>(output.getMappedResults().get(0), HttpStatus.OK);
	}

    @GetMapping(value = "/random")
    public ResponseEntity<?> random() {
        SampleOperation random = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(random);
        AggregationResults<Article> output = mongoTemplate.aggregate(aggregation, "articles", Article.class);
        return new ResponseEntity<>(output.getMappedResults().get(0).id, HttpStatus.OK);
    }

    //@PostMapping(value = "/label")

    @GetMapping(value = "/debug")
    public HttpStatus debug() {
        
    }
}