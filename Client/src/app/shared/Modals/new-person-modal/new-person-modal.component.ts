import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/Models/person';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { address } from 'src/app/Models/Address';
import { newPerson } from 'src/app/Models/newPerson';
import { AdminService } from './../../../Services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-person-modal',
  templateUrl: './new-person-modal.component.html',
  styleUrls: ['./new-person-modal.component.scss']
})
export class NewPersonModalComponent implements OnInit {
@Input()  updateSelectedRoles=new EventEmitter();
  person!: newPerson
  roles!:any[];
  addresses:any[]=[];
  NewAddress:address[]=[]
  IsRoleSelected=false
  constructor(
    public BsModalRef: BsModalRef) {
      this.person={
        userName:"",
        age:0,
        avatarId:0,
        email:"",
        roles:this.roles,
        gender:"Male",
        dateOfBirth:new Date(),
        phoneNumber:"",
        addresses:[{
          city:"",
          country:"",
          street:""
        }],
      }
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

  submit(){
    var personToBeCreated=this.person;
    personToBeCreated.roles=this.roles
    if (this.addresses.length==0) {
      personToBeCreated.addresses=this.NewAddress
    }else{
    personToBeCreated.addresses=this.addresses;
    }
 
   
    this.updateSelectedRoles.emit(personToBeCreated);
    this.BsModalRef.hide();    
  }
}
