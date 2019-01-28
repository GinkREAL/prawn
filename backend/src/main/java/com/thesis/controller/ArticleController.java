package com.thesis.controller;

import com.thesis.model.Article;
import com.thesis.model.Comment;
import com.thesis.model.User;
import com.thesis.model.ArticleRepository;
import com.thesis.model.UserRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.util.CloseableIterator;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.context.SecurityContextHolder;



@RestController
public class ArticleController { //read only

    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    private UserRepository userRepository;

    //db.articles.update({"_id":ObjectId('5badfc4f62b80e155641dcee')},{$set:{"valid":true, "targets":["Donald Trump", "Man rescued from Taliban"]}})

	@RequestMapping(value = "api/randomarticle", method = RequestMethod.GET)
	public ResponseEntity<?> fullrandom() {
		return new ResponseEntity<>(getRandomArticle(), HttpStatus.OK);
	}

    @RequestMapping(value = "api/randomarticleid", method = RequestMethod.GET)
    public ResponseEntity<?> random() {
		return new ResponseEntity<>(getRandomArticle().getId(), HttpStatus.OK);
    }

    @RequestMapping(value = "api/article", method = RequestMethod.POST)
    public ResponseEntity<?> assign() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);
        Query filterQuery = new Query(Criteria.where("id").nin(user.getAssignedArticles()));
        System.out.println("safds");
        CloseableIterator<Article> allArticles = mongoTemplate.stream(filterQuery, Article.class, "articles");
        while(allArticles.hasNext()){
            System.out.println("debug");
            Article article = allArticles.next();
            Query assignedQuery = new Query(Criteria.where("assignedArticles").in(article.getId()));
            long assignedUsers = mongoTemplate.count(assignedQuery, User.class, "users");
            if(assignedUsers >= 2) continue;
            user.getAssignedArticles().add(article.getId());
            userRepository.save(user);
            allArticles.close();
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    private Article getRandomArticle(){
        SampleOperation random = Aggregation.sample(1);
        MatchOperation valid = Aggregation.match(Criteria.where("valid").is(true));
        Aggregation aggregation = Aggregation.newAggregation(valid, random);
        AggregationResults<Article> output = mongoTemplate.aggregate(aggregation, "articles", Article.class);
        return output.getMappedResults().get(0);
    }
}