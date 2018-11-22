package com.thesis.controller;

import com.thesis.model.Article;
import com.thesis.model.Comment;
import com.thesis.model.ArticleRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Query;


@RestController
public class ArticleController { //read only

	@Autowired
	private ArticleRepository articleRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

	@RequestMapping(value = "api/random", method = RequestMethod.GET)
	public ResponseEntity<?> fullrandom() {
        SampleOperation random = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(random);
        AggregationResults<Article> output = mongoTemplate.aggregate(aggregation, "articles", Article.class);
		return new ResponseEntity<>(output.getMappedResults().get(0), HttpStatus.OK);
	}

    @RequestMapping(value = "api/randomid", method = RequestMethod.GET)
    public ResponseEntity<?> random() {
        SampleOperation random = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(random);
        AggregationResults<Article> output = mongoTemplate.aggregate(aggregation, "articles", Article.class);
        return new ResponseEntity<>(output.getMappedResults().get(0).getId(), HttpStatus.OK);
    }
}