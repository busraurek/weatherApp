import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials : any

  constructor( private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController) { }

  ngOnInit() {
    this.credentials = this.formBuilder.group({
      username: ['', [Validators.required]],
      password :['', [Validators.required]]
     });
  }

  get username (){
    return this.credentials.get('username');
  }

  get password (){
    return this.credentials.get('password')
  }

 onSubmit() {
  if (this.authService.login(this.credentials.value.username, this.credentials.value.password)) {
    this.router.navigate(['home'], { replaceUrl: true });
  } else {
    this.showAlert();
  }
}

  showAlert() {
    let alert = this.alertCtrl.create({
      header: 'Giriş Hatalı',
      message: 'Yanlış kimlik bilgileri',
      buttons: ['Tamam'],
    });
    alert.then((alert) => alert.present());
  }
}
