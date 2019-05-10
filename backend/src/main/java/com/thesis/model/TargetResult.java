package com.thesis.model;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.mongodb.core.mapping.Document;

public class TargetResult {
    public String target;
    public int commentsFavoring;
    public int commentsNeutral;
    public int commentsAgainst;
}