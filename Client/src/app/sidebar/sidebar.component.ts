import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/dashboard/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
   
    
    { path: '/dashboard/profile',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/dashboard/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
  
   
];

@Component({
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[]=[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}