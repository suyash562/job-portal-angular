import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{
  @Input('tableHead') tableHead! : string[];
  @Input('tableData') tableDataObject! : any[];
  @Input('tableDataKey') applicationDataKey! : any[];
  @Input('actions') actions! : string[];
  @Output() actionPerformed : EventEmitter<{actionType : string, dataObjectId : number}> = new EventEmitter();
  
  ngOnInit(): void {}

  actionClick(actionType : string, dataObjectId : number){
    this.actionPerformed.emit({actionType : actionType, dataObjectId : dataObjectId});
  }

}
