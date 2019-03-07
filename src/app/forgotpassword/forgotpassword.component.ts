import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/service/user/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  forgotpasswordForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  hide = true;



  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group({
      emailId: ['', Validators.required],
    });
  }

  get f() { return this.forgotpasswordForm.controls; }




  public onSubmit(emailId) {
    this.submitted = true;

    if (this.forgotpasswordForm.invalid) {
      return;
    }
    this.userService.forgotpassword(emailId).subscribe(response => {
      this.snackBar.open("Email to reset your password has been sent your email-id", "OK", {
        duration: 3000,
      });

    }, (error) => {
      this.snackBar.open("Email couldn't be sent", "OK", {
        duration: 3000,
      });
    });
  }
}