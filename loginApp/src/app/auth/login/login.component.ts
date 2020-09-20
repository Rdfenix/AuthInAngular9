import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      (user) => {
        console.log(user);
        this.info(`Logged in successfuly. Welcome ${user.firstName} !`);
        this.router.navigateByUrl('/');
      },
      (err) => {
        console.log(err);
        this.info('Login Error');
      }
    );
  }

  info(msg: string): void {
    this.snackBar.open(msg, 'OK', { duration: 2000 });
  }
}
