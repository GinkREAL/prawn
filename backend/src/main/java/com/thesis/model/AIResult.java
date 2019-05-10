package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;

@Document(value="results")
public class AIResult{
    @Id
    private String id;
    private String article; //article refers to reddit ID
    private Date dateCreated;
    private int commentsTotal;
    private List<TargetResult> results;

    protected AIResult(){

    }

    public String getId(){
        return id;
    }

    public String getArticleId(){
        return article;
    }

    public Date getDate(){
        return dateCreated;
    }

    public List<TargetResult> getResults(){
        return results;
    }

}

