import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
  @Input('userRole') userRole! : string | null;
  @Input('tableHead') tableHead! : string[];
  @Input('tableData') tableDataObject! : any[];
  @Input('removedApplicationsId') removedApplicationsId! : number[];
  @Input('tableDataKey') applicationDataKey! : any[];
  @Input('actions') actions! : string[];
  @Output() actionPerformed : EventEmitter<{actionType : string, dataObjectId : number}> = new EventEmitter();
  @Output() loadNextJobs : EventEmitter<{page : number, limit : number}> = new EventEmitter();
  
  actionClick(actionType : string, dataObjectId : number){
    this.actionPerformed.emit({actionType : actionType, dataObjectId : dataObjectId});
  }

  getClassForTableData(dataObject : any){
    if(this.userRole === 'employeer'){
      const deadlineForApplying : number = Date.parse(dataObject['deadlineForApplying']);
      const currentDate = Date.parse(new Date().toISOString().split('T')[0]);
      if(deadlineForApplying < currentDate){
        return 'applicationDeadlinePassed';
      }
    }
    return '';
  }
  
}
