package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;
import java.util.List;


@Document(value="articles")
public class Article{
    @Id
    public String id;
    public String subreddit;
    public String name;
    public int upvotes;
    public int downvotes;
    public int score;
    public boolean locked;
    public int num_comments;
    public String url;
    public Date last_modified;
    public String article_id;
    public boolean archived;
    public String author_fullname;
    public String author;
    public List<Comment> comments;
}