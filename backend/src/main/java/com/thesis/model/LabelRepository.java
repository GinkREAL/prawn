package com.thesis.model;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LabelRepository extends MongoRepository<Label, String> {
    public List<Label> findByLabeller(String label);
}