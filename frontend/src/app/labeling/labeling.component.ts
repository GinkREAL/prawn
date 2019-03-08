import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Labeling } from '../labeling';
import { Article } from '../models/article'
import { Comment } from '../models/comment'
import { Label } from '../models/label'
import { ArticleService } from '../services/article.service';
import { LabelService } from '../services/label.service';
import { AuthService } from '../services/auth.service.js';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';

@Component({
  selector: 'app-labeling',
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.css']
})
export class LabelingComponent implements OnInit {

  public username: String;
  public title: String;
  public url: String;
  public targetCount: number;
  public target: String;
  public comment: Comment;
  public count: number;


	labeling: Labeling = {
  	id: 2,
    name: 'labeling'
  };

  labelControl = new FormControl();

  constructor(private articleService: ArticleService, private labelService: LabelService, private authService: AuthService, private router: Router) {
    this['labelValue'] = ''
    this['stack'] = [];
  }

  undo() {
    if(this['targetCount'] > 0 && this['targetCount'] < this['object']['targets'].length){
      this['targetCount'] -= 1
      this['count'] -= 1
    } else {
      this['object'] = this['stack'].pop()
      console.log(this['object'])
      this['id'] = this['object']['id']
      this['title'] = this['object']['title']
      this['url'] = this['object']['url']

      this['commentAddress'] = this['object']['comments'][0]['address']
      this['comment'] = this['object']['comments'][0]['comment']

      this['count'] -= 1
      this['targetCount'] = this['object']['targets'].length - 1
    }
    this['target'] = this['object']['targets'][this['targetCount']]
  }

  nextComment() {
    this.labelService.getComment().subscribe((object: Article) => {
      // this['stack'].push(object)
      this['success'] = true
      console.log(object['comments'][0]['address'])
      this['commentAddress'] = object['comments'][0]['address']
      this['comment'] = object['comments'][0]['comment']
    }, error => {
      console.log(error)
    }, () => {
      if (this['success'] == true) {
        console.log("success")
      } else {
        this.labelService.assignArticle().subscribe(() => {
          this.postComment()
          this.router.navigate(['/', 'labeling'])
        })
      }
    })
  }

  nextTarget(obj) {
    this['target'] = obj['targets'][this['targetCount']]
  }

  logoutFunc() {
    this.authService.logout()
    this.router.navigate(['/', 'login'])
  }

  postComment() {
    this.labelService.getComment().subscribe((object: Article) => {
      // this['stack'].push(object)
      console.log(this['stack'])
      console.log(object)
      this['success'] = true
      this['object'] = object
      this['id'] = object['id']
      this['title'] = object['title']
      this['url'] = object['url']

      this['targetCount'] = 0
      this['target'] = object['targets'][this['targetCount']]

      this.labelService.getMyLabels().subscribe((labels: Label[]) => {
        this['count'] = labels.length
        this['labeledData'] = labels
        if (this['count'] < object['targets'].length) {
          this['commentAddress'] = object['comments'][0]['address']
        } else {
          this['commentAddress'] = object['comments'][0]['address']
        }
        
        this['comment'] = object['comments'][0]['comment']
      })
    }, error => {
      console.log(error)
    })
  }

  getLabel(labelValue) {
    this['stack'].push(this['object'])
    this['labelValue'] = labelValue
    this.labelService.postLabel(this['id'], this['commentAddress'].toString(), this['labelValue'], this['target']).subscribe()
    if (this['targetCount'] < this['object']['targets'].length) {
      this['targetCount'] += 1
      this.nextTarget(this['object'])
    }
    if (this['targetCount'] == this['object']['targets'].length) {
      this['success'] = false
      this.nextComment()
      this['targetCount'] = 0
      this.nextTarget(this['object'])
    }
    this.labelService.getMyLabels().subscribe((labels: Label[]) => {
      this['count'] = labels.length
    })  
  }

  ngOnInit() {
    this['username'] = window.localStorage.getItem('username');
    this['success'] = false
    this.labelService.getComment().subscribe((object: Article) => {
      // this['stack'].push(object)
      console.log(this['stack'])
      console.log(object)
      this['success'] = true
      this['object'] = object
      this['id'] = object['id']
      this['title'] = object['title']
      this['url'] = object['url']

      this['targetCount'] = 0
      this['target'] = object['targets'][this['targetCount']]

      this.labelService.getMyLabels().subscribe((labels: Label[]) => {
        this['count'] = labels.length
        this['labeledData'] = labels
        if (this['count'] < object['targets'].length) {
          this['commentAddress'] = object['comments'][0]['address']
        } else {
          this['commentAddress'] = object['comments'][0]['address']
        }
        
        this['comment'] = object['comments'][0]['comment']
      })
    }, error => {
      console.log(error)
    }, () => {
      if (this['success'] == true) {
        console.log("success")
      } else {
        this.labelService.assignArticle().subscribe(() => {
          this.postComment()
          this.router.navigate(['/', 'labeling'])
        })
      }
    })
  }
}
