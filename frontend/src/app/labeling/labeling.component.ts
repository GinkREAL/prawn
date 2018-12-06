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

  containsComment(arr1, obj) {
    var i;
    for (var i = 0; i < arr1.length; i++) {
      console.log(arr1.indexOf(obj) == this['labeledData'][i]['comment_address'])
      if (arr1.indexOf(obj) == this['labeledData'][i]['comment_address']) {
        return true
      }
      else {
        return false
      }
    }
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
    }
    this.labelService.getMyLabels().subscribe((labels: Label[]) => {
      this['count'] = labels.length
    })  
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

     
      this.labelService.getMyLabels().subscribe((labels: Label[]) => {
        this['count'] = labels.length
        this['labeledData'] = labels
        if (this['count'] < 3) {
          this['commentAddress'] = 0
        } else {
          this['commentAddress'] = (this['count'] / 3)
        }
        
        if (object['comments'][this['commentAddress']]['comment'] != "[deleted]" || object['comments'][this['commentAddress']]['comment'] != "[removed]") {
          // this['commentsList'] = object['comments']
          // console.log(this['commentsList'])
          // console.log(this['commentsList'].indexOf(object['comments'][this['commentAddress']]))
          // console.log(this.containsComment(this['commentsList'], object['comments'][this['commentAddress']]))
          // if (this.containsComment(this['commentsList'], object['comments'][this['commentAddress']]) === true) {
          //   this['comment'] = object['comments'][this['commentAddress']]['comment']
          // }
          // console.log(object['comments'])
          
          this['comment'] = object['comments'][this['commentAddress']]['comment']
        }    
      })
    })
  }

}
