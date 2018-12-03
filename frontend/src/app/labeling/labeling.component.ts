import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  labelControl = new FormControl('');

  constructor(private articleService: ArticleService, private labelService: LabelService) {
    this.labelValue = ''
  }

  nextComment(obj) {
    if (obj['comments'][this.buttonClicks]['comment'] != "[deleted]" || obj['comments'][this.buttonClicks]['comment'] != "[removed]") {
      this['comment'] = obj['comments'][this.buttonClicks]['comment']
      this.buttonClicks += 1
    }
  }

  getLabel(labelValue) {
    this.labelValue = labelValue
    console.log(this.labelValue)
    console.log(this['id'])
    console.log(this.buttonClicks.toString())
    this.labelService.postLabel(this['id'], this.buttonClicks.toString(), this.labelValue, 'sample target').subscribe()
    this.count += 1
    this.nextComment(this['object'])
  }


  ngOnInit() {
    this.username = window.localStorage.getItem('username');

    this.articleService.getRandomArticle().subscribe((object: Article) =>{
      this['object'] = object
      this['id'] = object['id']
      this['title'] = object['title']

      this.buttonClicks = 0
      this.count = 0
      if (object['comments'][this.buttonClicks]['comment'] != "[deleted]" || object['comments'][this.buttonClicks]['comment'] != "[removed]") {
        this['comment'] = object['comments'][this.buttonClicks]['comment']
        this.buttonClicks += 1
      }    
    })
  }

}
