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
    public String article_id;
    public String comment_address;
    public String label;
}