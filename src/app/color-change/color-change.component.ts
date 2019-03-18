import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-change',
  templateUrl: './color-change.component.html',
  styleUrls: ['./color-change.component.scss']
})
export class ColorChangeComponent implements OnInit {
  @Input() newNote
  @Output() colorChange=new EventEmitter();

  public colors=['#FFE4C4', '#5F9EA0','#00FFFF',
'#ADFF2F', '#FF69B4', '#F08080', '#778899','#4682B4','#F8F8FF'];
  constructor() { }

  ngOnInit() {
  }


  changeColor(color){
    console.log(color);
    this.newNote.color=color;
    const note = this.newNote;
    const data={note};
    this.colorChange.emit(data);
}
}
