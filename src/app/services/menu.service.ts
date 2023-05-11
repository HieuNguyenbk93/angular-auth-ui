import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private updatemenu = new Subject<void>();
  get updatmenu(){
    return this.updatemenu;
  }

  constructor() { }

  getMenuByRole(role: string){
    if (role === 'Admin') return of(['Page for Admin', 'Page for User', 'Page for Staff'])
    else if (role === 'User') return of(['Page for User', 'Page for Staff'])
    else return of(['Page for Staff']);
  }
}
