import { Component, OnInit } from '@angular/core';
import { Labeling } from '../labeling';

@Component({
  selector: 'app-labeling',
  templateUrl: './labeling.component.html',
  styleUrls: ['./labeling.component.css']
})
export class LabelingComponent implements OnInit {

	labeling: Labeling = {
  	id: 1,
    name: 'labeling'
  };

  constructor() { }

  ngOnInit() {
  }

}
