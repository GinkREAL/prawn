package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;
import java.util.List;


@Document(value="labels")
public class Label{
    @Id
    private String id;
    private String labeller;
    private String article_id;
    private String comment_address;
    private String label;
    private String target;

    public Label(String labeller, String article_id, String comment_address, String label, String target){
        this.labeller = labeller;
        this.article_id = article_id;
        this.comment_address = comment_address;
        this.label = label;
        this.target = target;
    }
}