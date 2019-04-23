package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;


@Document(value="articles")
public class Article{
    @Id
    private String id;
    private String subreddit;
    private String name;
    private String title;
    private int upvotes;
    private int downvotes;
    private int score;
    private boolean locked;
    private int num_comments;
    private String url;
    private Date last_modified;
    private String article_id;
    private boolean archived;
    private String author_fullname;
    private String author;
    private List<Comment> comments;
    private boolean valid;
    private String[] targets;

    public String getId(){
        return id;
    }

    public String getSubreddit(){
        return subreddit;
    }

    public String getName(){
        return name;
    }

    public String getTitle(){
        return title;
    }

    public int getUpvotes(){
        return upvotes;
    }

    public int getDownvotes(){
        return downvotes;
    }

    public int getScore(){
        return score;
    }

    public boolean isLocked(){
        return locked;
    }

    public int getCommentCount(){
        return num_comments;
    }

    public String getUrl(){
        return url;
    }

    public Date getLastModified(){
        return last_modified;
    }

    public String getArticleId(){
        return article_id;
    }

    public boolean isArchived(){
        return archived;
    }

    public String getAuthor(){
        return author;
    }

    public List<Comment> getComments(){
        return comments;
    }

    public boolean isValid(){
        return valid;
    }

    public String[] getTargets(){
        return targets;
    }

    public void setDisplay(List<Comment> comments){
        this.comments = comments;
    }
}