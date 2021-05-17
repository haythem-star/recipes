import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService} from '../share/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSub : Subscription;


  constructor(private dataStorage : DataStorageService,private authService : AuthService){}

  onSaveData(){
    this.dataStorage.storeRecipes();
  }

  onFetchData()
  {
    this.dataStorage.fetchRecipes().subscribe();
  

  }

  ngOnInit()
  {
    this.userSub= this.authService.user.subscribe(user => {
      this.isAuthenticated= !!user;
    });
  }

  onLogout ()
  {
    this.authService.Logout();
  }

  ngOnDestroy()
  {
    this.userSub.unsubscribe();
  }
}
