import { AfterViewInit, Component, EventEmitter, Input, OnInit, Self } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { address } from 'src/app/Models/Address';
import { Person } from './../../../Models/person';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-person-form-modal',
  templateUrl: './person-form-modal.component.html',
  styleUrls: ['./person-form-modal.component.scss']
})
export class PersonFormModalComponent implements OnInit{
@Input()  updateSelectedRoles=new EventEmitter();
  person!: Person;
  roles!:any[];
  addresses!:any[];
  NewAddress!:address
  IsRoleSelected=false

    constructor(public BsModalRef: BsModalRef) { 
      this.addAddress();
  }
 

  ngOnInit(): void {
      this.NoRolesSelected()
  }
  NoRolesSelected(){
    this.IsRoleSelected=Object.values(this.roles).some(v=>v.checked ==true)
  }
  addAddress(){
    this.NewAddress={
      city:"",
      country:"",
      street:""
     }
  }

  submit(){
    var personToBeUpdated=this.person;
    if (this.addresses.length==0) {
      personToBeUpdated.addresses.push(this.NewAddress)
    }else if (this.NewAddress.city!='' ) {
    this.addresses.push(this.NewAddress)
    personToBeUpdated.addresses=this.addresses;
     console.log(personToBeUpdated);

    }
    personToBeUpdated.roles=this.roles
    this.updateSelectedRoles.emit(personToBeUpdated);
    this.BsModalRef.hide();    
  }
}
