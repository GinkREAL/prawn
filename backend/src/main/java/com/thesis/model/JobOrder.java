package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value="jobs")
public class JobOrder{
    @Id
    private String id;
    private String article; //article refers to reddit ID

    public JobOrder(String article){
        this.article = article;
    }
}

