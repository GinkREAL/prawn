package com.thesis.model;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface JobOrderRepository extends MongoRepository<JobOrder, String> {
}