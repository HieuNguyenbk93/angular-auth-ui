import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash"
  loginForm!: FormGroup;
  emailReset: string = "";

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService,
    private userStore : UserStoreService,
    private resetService: ResetPasswordService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? "fa-eye" : "fa-eye-slash";
    this.type = this.isText ? "text" : "password";
  }

  onLogin(){
    if (this.loginForm.valid){
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toast.success({detail:'Success', summary:res.message, duration:5000});
          this.auth.storeToken(res.accessToken);
          this.auth.storeRefreshToken(res.refreshToken);
          const tokenPayload = this.auth.decodeToken();
          this.userStore.setFullNameForStore(tokenPayload.name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.loginForm.reset();
          this.router.navigate(['dashboard']);
        },
        error: (err) => {
          console.log(err);
          this.toast.error({detail:'Error', summary:'something error', position:'br', duration:5000});
        }
      })
    } else {
      console.log("Form is not valid");
      this.validateAllFormFileds(this.loginForm);
      alert("Form invalid");
    }
  }

  private validateAllFormFileds(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFileds(control);
      }
    })
  }

  onClickResetPassword(){
    console.log(this.emailReset);

    this.resetService.sendResetPasswordLink(this.emailReset).subscribe({
      next: (res) => {
        this.toast.success({detail:'Success', summary:'Reset success', duration:5000});
        this.emailReset = "";
        const btnClose = document.getElementById("btnClose");
        btnClose?.click();
      },
      error: (err) => {
        console.log(err);
        this.toast.error({detail:'Error', summary:'something error', position:'br', duration:5000});
      }
    })
  }

}
