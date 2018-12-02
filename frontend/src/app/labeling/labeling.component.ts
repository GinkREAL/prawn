import { Component, OnInit } from '@angular/core';
import { Labeling } from '../labeling';
import { Article } from '../models/article'
import { ArticleService } from '../services/article.service';
import { LabelService } from '../services/label.service';

@Component({
  selector: 'app-labeling',
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.css']
})
export class LabelingComponent implements OnInit {

	labeling: Labeling = {
  	id: 2,
    name: 'labeling'
  };

  constructor(private articleService: ArticleService, private labelService: LabelService) { }

  ngOnInit() {
    this.articleService.getRandomArticle().subscribe((object: Article) =>{
      this.id = object.id
      this.title = object.title

      for (let i=0; i < object.comments.length; i++) {
        let comment_address = i.toString()
        console.log(object.comments[i]);
      }
      
    })
  }

}
