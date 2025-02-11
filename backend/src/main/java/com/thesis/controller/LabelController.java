package com.thesis.controller;

import com.thesis.model.Article;
import com.thesis.model.Label;
import com.thesis.model.Comment;
import com.thesis.model.ArticleRepository;
import com.thesis.model.LabelRepository;
import com.thesis.model.User;
import com.thesis.model.UserRepository;
import com.thesis.model.Heatmap;
import com.thesis.model.HeatmapRepository;

import java.util.List;
import java.util.ArrayList;
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
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;


@RestController
public class LabelController { //controls both comments and labels, actually

    @Autowired
    private ArticleRepository articleRepository;
    @Autowired
    private LabelRepository labelRepository;
    @Autowired
    private HeatmapRepository heatmapRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @RequestMapping(value = "api/comment", method = RequestMethod.GET)
    public ResponseEntity<?> verifyz() {
        String username = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User user = userRepository.findByUsername(username);

        String[] checkpoint = user.getCheckpoint().split(",");
        int tmp = Integer.parseInt(checkpoint[0]);
        if(tmp >= user.getAssignedArticles().size())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        String articleid = user.getAssignedArticles().get(tmp);
        Heatmap hm = heatmapRepository.findByArticle(articleid);
        Optional<Article> article = articleRepository.findById(articleid);
        if(hm == null || !article.isPresent()) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        String caddress = hm.getAddress(Integer.parseInt(checkpoint[1]));
        Comment comment = getComment(articleid, caddress);
        ArrayList<Comment> display = new ArrayList<Comment>();
        comment.replies = null;
        comment.address = caddress;
        display.add(comment);
        article.get().setDisplay(display);
        return new ResponseEntity<>(article.get(), HttpStatus.OK);
    }

    @RequestMapping(value = "api/label", method = RequestMethod.POST)
    public HttpStatus label(String article_id, String comment_address, String label, String target){
        Comment comment = getComment(article_id, comment_address);
        if(comment == null){
            return HttpStatus.NOT_FOUND;
        }
        String labeller = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Label oldLabel = getLabelComposite(labeller, target, article_id, comment_address);
        if(oldLabel != null){
            labelRepository.delete(oldLabel);
        }
        Label newlabel = new Label(labeller, article_id, comment_address, label, target);
        User user = userRepository.findByUsername(labeller);
        String[] checkpoint = user.getCheckpoint().split(",");
        Heatmap hm = heatmapRepository.findByArticle(article_id);
        String caddress = hm.getAddress(Integer.parseInt(checkpoint[1]));
        if(comment_address.equals(caddress)) {
            int temp = Integer.parseInt(checkpoint[1]) + 1;
            if(temp > 100){
                int temp2 = Integer.parseInt(checkpoint[0]) + 1;
                user.setCheckpoint(Integer.toString(temp2) + ",0");
            } else {
                user.setCheckpoint(checkpoint[0] + "," + Integer.toString(temp));
            }
        }
        userRepository.save(user);
        labelRepository.save(newlabel);
        return HttpStatus.CREATED;
    }

    @RequestMapping(value = "api/label", method = RequestMethod.GET)
    public ResponseEntity<?> getLabel(@RequestHeader(name = "article_id", required=true) String article_id, 
                                    @RequestHeader(name = "comment_address", required=true) String comment_address){

        String user = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Label label = getLabelComposite(user, "", article_id, comment_address);
        if(label != null) {
            return new ResponseEntity<>(label, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "api/mylabels", method = RequestMethod.GET)
    public ResponseEntity<?> getMyLabels(){
        String user = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Label> labels = labelRepository.findByLabeller(user);
        return new ResponseEntity<>(labels, HttpStatus.OK);
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

    private Label getLabelComposite(String username, String target, String article_id, String comment_address){
        Query labelQuery = new Query();
        if(!username.equals("")){
            labelQuery.addCriteria(Criteria.where("labeller").is(username));
        }
        if(!target.equals("")){
            labelQuery.addCriteria(Criteria.where("target").is(target));
        }
        labelQuery.addCriteria(Criteria.where("article_id").is(article_id));
        labelQuery.addCriteria(Criteria.where("comment_address").is(comment_address));
        List<Label> results = mongoTemplate.find(labelQuery, Label.class,"labels");
        if(results.size()>0){
            return results.get(0);
        } else {
            return null;
        }
    }
}