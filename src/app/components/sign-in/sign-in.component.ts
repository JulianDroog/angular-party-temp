import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserLogin } from 'src/app/shared/models/user-login.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  model = new UserLogin('','');
  submitted : boolean = false;
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.SignIn(this.model.email, this.model.password);
  }

}
