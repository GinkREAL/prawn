package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.lang.IndexOutOfBoundsException;

@Document(value="heatmaps")
public class Heatmap{
    @Id
    private String id;
    private String article;
    private List<Entry> heatmap;

    protected class Entry{
        protected String comment_address;
        protected int score;
    }

    private Heatmap(){
    }

    public String getId(){
        return id;
    }

    public String getArticle(){
        return article;
    }

    public String getAddress(int number){
        try {
            return heatmap.get(number).comment_address;
        } catch (IndexOutOfBoundsException ex) {
            return null;
        }
    }
}

