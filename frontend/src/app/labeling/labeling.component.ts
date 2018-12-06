import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Labeling } from '../labeling';
import { Article } from '../models/article'
import { Label } from '../models/label'
import { ArticleService } from '../services/article.service';
import { LabelService } from '../services/label.service';
import { AuthService } from '../services/auth.service.js';
import { Router } from '@angular/router';

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

  constructor(private articleService: ArticleService, private labelService: LabelService, private authService: AuthService, private router: Router) {
    this['labelValue'] = ''
  }

  nextComment(obj) {
    if (obj['comments'][this['commentAddress']]['comment'] != "[deleted]" || obj['comments'][this['commentAddress']]['comment'] != "[removed]") {
      this['comment'] = obj['comments'][this['commentAddress']]['comment']
    }
  }

  nextTarget(obj) {
    this['target'] = obj['targets'][this['targetCount']]
  }

  logoutFunc() {
    this.authService.logout()
    this.router.navigate(['/', 'login'])
  }

  getLabel(labelValue) {
    this['labelValue'] = labelValue
    this.labelService.postLabel(this['id'], this['commentAddress'].toString(), this['labelValue'], this['target']).subscribe()
    if (this['targetCount'] < this['object']['targets'].length) {
      this['targetCount'] += 1
      this.nextTarget(this['object'])  
    }
    if (this['targetCount'] == this['object']['targets'].length) {
      this['commentAddress'] += 1
      this.nextComment(this['object'])
      this['targetCount'] = 0
      this.nextTarget(this['object'])
      this['count'] += 1
    }
  }

  ngOnInit() {
    this['username'] = window.localStorage.getItem('username');

    this.articleService.getRandomArticle().subscribe((object: Article) => {
      this['object'] = object
      this['id'] = object['id']
      this['title'] = object['title']
      this['url'] = object['url']

      this['targetCount'] = 0
      this['target'] = object['targets'][this['targetCount']]

      this['commentAddress'] = 0
      this.labelService.getMyLabels().subscribe((labels: Label[]) => {
        this['count'] = labels.length
      })

      if (object['comments'][this['commentAddress']]['comment'] != "[deleted]" || object['comments'][this['commentAddress']]['comment'] != "[removed]") {
        this['comment'] = object['comments'][this['commentAddress']]['comment']
      }    
    })
  }

}
