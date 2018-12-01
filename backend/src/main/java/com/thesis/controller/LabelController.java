package com.thesis.controller;

import com.thesis.model.Article;
import com.thesis.model.Label;
import com.thesis.model.Comment;
import com.thesis.model.ArticleRepository;
import com.thesis.model.LabelRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class LabelController {

    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private LabelRepository labelRepository;

    @RequestMapping(value = "api/comment", method = RequestMethod.GET)
    public ResponseEntity<?> verify(@RequestHeader(name = "article_id", required=true) String article_id, 
                                    @RequestHeader(name = "comment_address", required=true) String comment_address) {
        Comment comment = getComment(article_id, comment_address);
        if(comment == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(comment,HttpStatus.OK);
        }
    }

    @RequestMapping(value = "api/label", method = RequestMethod.POST)
    public HttpStatus label(String article_id, String comment_address, String label, String target){
        Comment comment = getComment(article_id, comment_address);
        if(comment == null){
            return HttpStatus.NOT_FOUND;
        } else {
            String labeller = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Label newlabel = new Label(labeller, article_id, comment_address, label, target);
            labelRepository.save(newlabel);
            return HttpStatus.CREATED;
        }
    }

    private Comment getComment(String article_id, String comment_address){
        Optional<Article> article = articleRepository.findById(article_id);
        if(article.isPresent()){
            String[] address = comment_address.split(",");
            Comment comment = article.get().getComments().get(Integer.parseInt(address[0]));
            for(int i = 1 ; i < address.length ; i++){
                comment = comment.replies.get(Integer.parseInt(address[i]));
            }
            return comment;
        } else {
            return null;
        }
    }
}