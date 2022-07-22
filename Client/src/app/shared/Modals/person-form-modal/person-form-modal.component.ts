import { AfterViewInit, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { address } from 'src/app/Models/Address';
import { Person } from './../../../Models/person';
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
  NewAddress:address[]=[]
  IsRoleSelected=false
  constructor(
    public BsModalRef: BsModalRef) {
     }

  ngOnInit(): void {
      this.NoRolesSelected()
     this.NewAddress=[{
      city:"",
      country:"",
      street:""
     }]
  }
  NoRolesSelected(){
    this.IsRoleSelected=Object.values(this.roles).some(v=>v.checked ==true)
  }
  addAddress(){
    this.NewAddress.push({
      city:"",
      country:"",
      street:""
     })
  }
  submit(){
    var personToBeUpdated=this.person;
    if (this.addresses.length==0) {
      
      personToBeUpdated.addresses=this.NewAddress
    }else{
    personToBeUpdated.addresses=this.addresses;
    }
    personToBeUpdated.roles=this.roles
    this.updateSelectedRoles.emit(personToBeUpdated);
    this.BsModalRef.hide();    
  }
}
