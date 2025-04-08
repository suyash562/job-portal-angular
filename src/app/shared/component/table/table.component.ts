import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent{
  pDialogueBoxEnabled : boolean = false;
  @Input('userRole') userRole! : string | null;
  @Input('tableHead') tableHead! : string[];
  @Input('tableData') tableDataObject! : any[];
  @Input('removedApplicationsId') removedApplicationsId! : number[];
  @Input('tableDataKey') applicationDataKey! : any[];
  @Input('actions') actions! : string[];
  @Output() actionPerformed : EventEmitter<{actionType : string, dataObjectId : any}> = new EventEmitter();
  @Output() loadNextJobs : EventEmitter<{page : number, limit : number}> = new EventEmitter();


  actionClick(actionType : string, dataObjectId : any){
    this.actionPerformed.emit({actionType : actionType, dataObjectId : dataObjectId});
  }

  getClassForTableData(dataObject : any){
    if(this.userRole === 'employeer'){
      const deadlineForApplying : number = Date.parse(dataObject['deadlineForApplying']);
      const currentDate : number = Date.parse(new Date().toISOString().split('T')[0]);      
      if(deadlineForApplying < currentDate){
        return 'applicationDeadlinePassed';
      }
    }
    return '';
  }
  
  getStyleForStatusField(status : string){
    if(status === 'Accepted'){
      return  { color : 'green', 'font-weight' : 'bold'};
    }  
    else if(status === 'Rejected'){
      return  { color : 'red', 'font-weight' : 'bold'};
    }
    else if(status === 'Interview'){
      return  { color : 'rgb(25, 162, 216)', 'font-weight' : 'bold'};
    }
    return null;
  }

}
