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
public class ArticleController {

	@Autowired
	private ArticleRepository articleRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

	@RequestMapping(value = "/fullrandom", method = RequestMethod.GET)
	public ResponseEntity<?> fullrandom() {
        SampleOperation random = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(random);
        AggregationResults<Article> output = mongoTemplate.aggregate(aggregation, "articles", Article.class);
		return new ResponseEntity<>(output.getMappedResults().get(0), HttpStatus.OK);
	}

    @RequestMapping(value = "/random", method = RequestMethod.GET)
    public ResponseEntity<?> random() {
        SampleOperation random = Aggregation.sample(1);
        Aggregation aggregation = Aggregation.newAggregation(random);
        AggregationResults<Article> output = mongoTemplate.aggregate(aggregation, "articles", Article.class);
        return new ResponseEntity<>(output.getMappedResults().get(0).id, HttpStatus.OK);
    }

    @RequestMapping(value = "/verify", method = RequestMethod.POST)
    public ResponseEntity<?> debug(String id, String comment_address) {
        Optional<Article> article = articleRepository.findById(id);
        if(article.isPresent()){
            String[] address = comment_address.split(",");
            Comment comment = article.get().comments.get(Integer.parseInt(address[0]));
            for(int i = 1 ; i < address.length ; i++){
                comment = comment.replies.get(Integer.parseInt(address[i]));
            }
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("", HttpStatus.NOT_FOUND);
        }
    }
}