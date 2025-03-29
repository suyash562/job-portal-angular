import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';


@Component({
  selector: 'app-filter-options',
  standalone: false,
  templateUrl: './filter-options.component.html',
  styleUrl: './filter-options.component.css'
})
export class FilterOptionsComponent {
  matchedCompanyNames : string[] = [];
  selectedCompanyName : FormControl = new FormControl();
  selectedworkMode! : { option: string};
  selectedemployementType! : { option: string};
  selectedSort! : { option: string};
  @Input('companyNamesList') companyNamesList! : string[];

  workModeOptions : { option : string}[] = [
    {option : 'Online'},
    {option : 'Offline'},
    {option : 'Hybrid'},
  ]
  employementTypeOptions : { option : string}[] = [
    {option : 'Full Time'},
    {option : 'Part Time'},
  ]
  sortOptions : { option : string}[] = [
    {option : 'A-Z'},
    {option : 'Z-A'},
  ]

  @Output() filterEvent : EventEmitter<
    { company : string | null,
      workMode : string | null,
      employementType : string | null,
      sort : string | null
    }> = new EventEmitter();
  @Output() clearFilterEvent : EventEmitter<void> = new EventEmitter();

  filterOptionSelected(){    
    this.filterEvent.emit(
      {
        company : this.selectedCompanyName.value ? this.selectedCompanyName.value.toLowerCase() : null,
        workMode : this.selectedworkMode ? this.selectedworkMode.option : null,
        employementType : this.selectedemployementType ? this.selectedemployementType.option : null,
        sort : this.selectedSort ? this.selectedSort.option : null
      }
    );
  }

  clearFilters(){
    if(this.selectedCompanyName.value || this.selectedworkMode || this.selectedemployementType || this.selectedSort){
      this.selectedCompanyName.reset();
      this.selectedworkMode = {option : ''};
      this.selectedemployementType = {option : ''};
      this.selectedSort = {option : ''};
      this.clearFilterEvent.emit();
    }
  }

  getSuggestions(event: AutoCompleteCompleteEvent) {
    this.matchedCompanyNames = this.companyNamesList.filter(companyName => companyName.toLowerCase().includes(event.query.toLowerCase()));
  }

  onCompanySelected(){
    this.filterOptionSelected();
  }
}
