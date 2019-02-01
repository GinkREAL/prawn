package com.thesis.model;

import java.util.List;
import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

public class Comment{
    public String article;
    public String address;
    public String comment;
    public String created_utc;
    public String distinguished;
    public Object edited;
    public String comment_id;
    public double score;
    public boolean stickied;
    public String author_fullname;
    public String author;
    public List<Comment> replies;
}