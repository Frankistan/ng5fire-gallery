import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { PasswordValidator } from '../../validators/match-password';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    hide = true;
    signupForm: FormGroup;

    constructor(
        private auth: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: SnackbarService
    ) {
        this.signupForm = this.formBuilder.group({
            name: ['test', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
            email: ['test@example.com', [Validators.required, Validators.email]],
            photoURL: ['', []],
            password: ['123456', Validators.required],
            password_confirm: ['123456', Validators.required]
        }, {
                validator: PasswordValidator.MatchPassword // your validation method
            });
    }

    signup() {
        const inputValue = this.signupForm.value;

        this.auth.signup(inputValue).subscribe(
        success => {
                this.snackBar.open('toast.signup');
                this.router.navigate(['/images']);
            },
        error => {
            this.snackBar.open('toast.firebase.' + error.code, 'toast.close');
        });
    }

}
