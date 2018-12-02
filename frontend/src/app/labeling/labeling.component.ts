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

  constructor(private articleService: ArticleService, private labelService: LabelService) { }

  loopComments(arr, id, label) {
    var i = 0
    let comment_address = i.toString()
    if (arr[i]['comment'] != "[deleted]" || arr[i]['comment'] != "[removed]") {
      this['comment'] = arr[i]['comment']
      this.labelService.postLabel(id, comment_address, label).subscribe()
    }
    
    i++

    if(i < arr.length) {
      loopComments(arr, id, label)
    }
  }

  getLabel(label) {
    this['label'].setValue(label);
  }


  ngOnInit() {
    this.articleService.getRandomArticle().subscribe((object: Article) =>{
      this['id'] = object['id']
      this['title'] = object['title']

      console.log(this['label'])

      this.loopComments(object['comments'], object['id'], this['label'])

      // for (let i=0; i < object['comments'].length; i++) {
      //   let comment_address = i.toString()
      //   // console.log(object['comments'][i]);
      //   if (object['comments'][i] != "[deleted]" || object['comments'][i] != "[removed]") {
      //     this['comment'] = object['comments'][i]['comment']
      //     let label = this['label']
      //     this.labelService.postLabel(object['id'], comment_address, label).subscribe()
      //   }
      // }
      
    })
  }

}
