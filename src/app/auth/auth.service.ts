import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject,  throwError } from 'rxjs';
import { User} from './user.model';
import { Router } from '@angular/router';


export interface AuthResponseData {
  idToken	: string;	
  email	: string	;
  refreshToken	: string;	
  expiresIn	: string;	
  localId : string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer : any;

  constructor(private http : HttpClient,private router : Router) { }

  SignUp(email : string,password : string)
  {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD84NsT2yaAxj1yCoOL3LYj0xp3gX_Pwb4',
    {
      email : email,
      password : password,
      returnSecureToken: true
    }).pipe(catchError(this.ErrorHandler),tap(
      respData => {
        this.HandlerAuthentificatin(respData.email,respData.localId,respData.idToken,+respData.expiresIn);
      }
    ));
  }

  Login(email : string, password : string)
  {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD84NsT2yaAxj1yCoOL3LYj0xp3gX_Pwb4',
    {
      email : email,
      password : password,
      returnSecureToken: true
    }).pipe(catchError(this.ErrorHandler),tap(
      respData => {
        this.HandlerAuthentificatin(respData.email,respData.localId,respData.idToken,+respData.expiresIn);
      }
    ));
  }

  autoLogin()
  {
    const userData : {
      email :string,
      id :string,
      _token: string,
      _tokenExpirationDate : string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData)
    {
      return;
    }
    const loaduser = new User(userData.email,userData.id,userData._token,
      new Date(userData._tokenExpirationDate));
    if (loaduser.token)
    {
      this.user.next(loaduser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }


  private ErrorHandler(errorRes : HttpErrorResponse)
  {
    let errorMessage = "An unknow error occurred!";
      if (!errorRes.error || !errorRes.error.error)
      {
        return throwError(errorMessage);
      }
      switch (errorRes.error.error.message)
      {
        case 'EMAIL_EXISTS' : errorMessage="This Email exist Already";
        break;
        case 'EMAIL_NOT_FOUND' : errorMessage ="Email not found";
        break;
        case 'INVALID_PASSWORD' : errorMessage = "password is not correct";
      }
      return throwError(errorMessage);
  }

  private HandlerAuthentificatin(email : string,id : string, token : string, expiration : number)
  {
    const expiratinDate = new Date(new Date().getTime() + expiration*1000);
    const user = new User(email,id,token,expiratinDate);
    this.user.next(user);
    this.autoLogout(expiration*1000);
    localStorage.setItem('userData', JSON.stringify(user));

  }

  Logout()
  {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer)
    {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer=null;
  }
  autoLogout(expiratinDuration : number)
  {
    this.tokenExpirationTimer= setTimeout(() => {
      this.Logout();
    },expiratinDuration)
  }
}
