import {  Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Person } from '../../../Models/person';
import { PersonService } from './../../../Services/person-service.service';
import { AdminService } from '../../../Services/admin.service';
import { ConfirmationModalComponent } from '../../../shared/Modals/confirmation-modal/confirmation-modal.component';
import { PersonFormModalComponent } from '../../../shared/Modals/person-form-modal/person-form-modal.component';
import { NewPersonModalComponent } from '../../../shared/Modals/new-person-modal/new-person-modal.component';
@Component({
    selector: 'dashboard-cmp',
    templateUrl: 'dashboard.component.html',
  styleUrls: ["./dashboard.component.scss"],
})

export class DashboardComponent implements OnInit,OnDestroy{
  dtOptions: DataTables.Settings = {};
  Persons:Person[]=[]
 dtTrigger: Subject<any> = new Subject<any>();
  currentUser!:Person
  IsAdmin=false;
  modalRef!:BsModalRef;
  constructor(private personsService: PersonService,  private modalService:BsModalService,private toaster:ToastrService,private adminService:AdminService,public dialog: MatDialog) {}   
 

   
    ngOnInit(): void {
      //Get Current User
      this.currentUser=JSON.parse(localStorage.getItem('user')||"null");
      //IsAdmin
   if (this.currentUser?.roles.find(a=>a.includes("Admin"))) {
      this.IsAdmin=true
      }
    //TableOptions
    this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 2,
        serverSide: true,
        processing: true,
        searching: true,

      };

    this.getPersons()

  }

  getPersons(){
     this.personsService.getAllPersons().subscribe(response=>{
      this.Persons=response
       this.dtTrigger.next(this.Persons);
    })
  }


  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.remove(id).subscribe(response=>{
          this.toaster.success("Deleted Successfully","Success",{positionClass:"toast-bottom-left"})
          this.getPersons()
          window.alert=function(){}
        })
      }
    });
  }
  
  edit(person: Person) {
    this.adminService.getPersonWithRoles(person.id).subscribe(result=>{
        person.roles=result.roles
        const config = {
      class:'modal-dialog-centered',
      initialState:{
        person,
        roles:this.GetRolesArray(person),
        addresses:person.addresses
      }
      }
 
   this.modalRef=this.modalService.show(PersonFormModalComponent,config);

    this.modalRef.content?.updateSelectedRoles.subscribe((values:Person)=>{

  const rolestosend={
      roles:[...values.roles.filter(el=>el.checked==true).map(el=>el.name)]
    };
    values.roles=[]
    this.adminService.updatePerson(person.id,values,rolestosend.roles).subscribe((result)=>{
      if (result) {
      this.toaster.success("updated Successfully","Success",{positionClass:"toast-bottom-left"})
      this.getPersons();
      window.alert=function(){};
      }
      
    })
  })
  })
    }
    
    newPerson(){
      const config = {
      class:'modal-dialog-centered',
      initialState:{
        roles: [
         {name:"Admin",value:"Admin",checked:false},
         {name:"Moderator",value:"Moderator",checked:false},
         {name:"Member",value:"Member",checked:true}
              ]
        }
      }
    this.modalRef=this.modalService.show(NewPersonModalComponent,config);
    this.modalRef.content?.updateSelectedRoles.subscribe((values:Person)=>{
    const rolestosend={
      roles:[...values.roles.filter(el=>el.checked==true).map(el=>el.name)]
    };
      values.roles=[];
    this.adminService.AddPerson(values,rolestosend.roles).subscribe((response:any)=>{
    if (response.result=="successfull") {
     this.toaster.success("Added Successfully","Success",{positionClass:"toast-bottom-left"})
      this.getPersons();
      window.alert=function(){}
               }
           })
       });
    }
    private GetRolesArray(person:Person){
      const RoleToGet:any=[];
      const UserRoles=person.roles;
      const availableRoles:any[]=[
        {name:"Admin",value:"Admin"},
        {name:"Moderator",value:"Moderator"},
        {name:"Member",value:"Member"},
      ]
      
      availableRoles.forEach(r=>{
       let IsMatch=false;
        for (const userRole of UserRoles) {
        if (r.name==userRole) {
        IsMatch=true;
        r.checked=true
        RoleToGet.push(r)
        break;
          }
        }
        if (!IsMatch) {
          r.checked=false;
          RoleToGet.push(r);
        }
      })
      
      return RoleToGet;
      
    }
 
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();}
}




