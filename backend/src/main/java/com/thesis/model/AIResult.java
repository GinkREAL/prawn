package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value="results")
public class AIResult{
    @Id
    private String id;
    private String target;
    private String article; //article refers to reddit ID
    private int commentsFavoring;
    private int commentsNeutral;
    private int commentsAgainst;

    protected AIResult(){

    }

    public String getId(){
        return id;
    }

    public String getTarget(){
        return target;
    }

    public String getArticleId(){
        return article;
    }

    public int getCommentsFavoring(){
        return commentsFavoring;
    }

    public int getCommentsNeutral(){
        return commentsNeutral;
    }

    public int getCommentsAgainst(){
        return commentsAgainst;
    }

}

