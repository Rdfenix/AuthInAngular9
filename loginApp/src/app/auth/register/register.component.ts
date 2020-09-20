import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  formRegister = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      mobilePhone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.matchingPasswords,
    }
  );

  states = ['MG', 'SP', 'SC', 'GO', 'PR', 'RS'];

  ngOnInit(): void {}

  matchingPasswords(group: FormGroup): any {
    if (group) {
      const pass1 = group.controls.password1.value;
      const pass2 = group.controls.password2.value;
      if (pass1 === pass2) {
        return null;
      }
    }

    return { matching: false };
  }

  onSubmit(): void {
    console.log(this.formRegister.value);
    const user: User = {
      ...this.formRegister.value,
      password: this.formRegister.value.password1,
    };
    this.authService.register(user).subscribe(
      (userResp) => {
        console.log(userResp);
        this.info('Successfuly registered');
        this.router.navigateByUrl('/auth/login');
      },
      (err) => {
        console.error(err);
        this.info(err.error.message);
      }
    );
  }

  info(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 2000,
    });
  }
}
