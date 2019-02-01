package com.thesis.model;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface HeatmapRepository extends MongoRepository<Heatmap, String> {
    public Heatmap findByArticle(String article);
}