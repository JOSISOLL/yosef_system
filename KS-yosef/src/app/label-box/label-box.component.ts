import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-label-box',
  templateUrl: './label-box.component.html',
  styleUrls: ['./label-box.component.css']
})
export class LabelBoxComponent implements OnInit {
  @Input() data : any[];

  constructor() { }

  ngOnInit() {  
    
  }

}
