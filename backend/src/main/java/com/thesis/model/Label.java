package com.thesis.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.Date;
import java.util.List;


@Document(value="labels")
public class Label{
    @Id
    public String id;
    public String labeller;
    public String article_id;
    public String comment_address;
    public String label;

    public Label(String labeller, String article_id, String comment_address, String label){
        this.labeller = labeller;
        this.article_id = article_id;
        this.comment_address = comment_address;
        this.label = label;
    }
}