import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: any;

  public fullName: string = "";
  public role!: string;

  displayAdmin = false;
  displayUser = false;
  displayStaff = false;
  menuList$: any;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private userStore: UserStoreService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.api.getUsers().subscribe(res => {
      this.users = res;
    });
    this.userStore.getFullNameFromStore().subscribe(val => {
      let fullnameFromToken = this.auth.getFullnameFromToken();
      this.fullName = val || fullnameFromToken;
    });
    this.userStore.getRoleFromStore().subscribe(val => {
      let roleFromToken = this.auth.getRoleFromToken();
      this.role = val || roleFromToken;
    });
    this.loadMenu();
    this.menuDisplay()
  }

  logout(){
    this.auth.signOut();
  }

  menuDisplay(){
    this.displayAdmin = this.role === 'Admin';
    this.displayUser = this.role === 'Admin' || this.role === 'User';
  }

  loadMenu(){
    this.menuService.getMenuByRole(this.role).subscribe(result => {
      console.log(result);
      this.menuList$ = result;
    })
  }

}
