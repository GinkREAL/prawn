package com.thesis.model;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface AIResultRepository extends MongoRepository<AIResult, String> {
    public AIResult findByArticle(String article);
}