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
    public BsModalRef: BsModalRef,private adminService:AdminService,private toaster:ToastrService) {
      this.person={
        userName:"",
        age:0,
        avatarId:0,
        email:"",
        gender:"",
        created:new Date(),
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
    console.log(personToBeUpdated);
    personToBeUpdated.dateOfBirth=new Date()
debugger
    this.adminService.AddPerson(personToBeUpdated).subscribe((response:any)=>{
     if (response.result=="successfull") {
      this.toaster.success("Added")
     }
    })
    this.updateSelectedRoles.emit(personToBeUpdated);
    this.BsModalRef.hide();    
  }
}
