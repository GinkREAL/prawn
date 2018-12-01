import { Component, OnInit } from '@angular/core';
import { Labeling } from '../labeling';
import { ArticleService } from '../services/article.service.js';

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

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
  }

}
