import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { RecaptchaLoaderService } from 'ng-recaptcha';
import { AuthService } from './../../shared/services/auth.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { environment } from '../../../environments/environment';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    hide = true;
    loginForm: FormGroup;
    clientKey: string = environment.recaptcha.clientKey;
    loaderReady = false;

    constructor(
        public auth: AuthService,
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: SnackbarService,
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['test@example.com', [Validators.required, Validators.email]],
            password: ['123456', Validators.required],
            recaptcha: [null, Validators.required]
        });
        // this.loginForm.get('recaptcha').reset();
    }

    login() {
        const inputValue = this.loginForm.value;
        this.auth.login(inputValue.email, inputValue.password);
    }

    socialLogin(provider: string) {
        this.auth.loginWithProvider(provider)
            .then(success => { this.router.navigate(['/images']); })
            .catch(error => this.errorHandler(error.code));
    }

    private errorHandler(error: any) {
        this.snackBar.open('toast.firebase.' + error, 'toast.close');
    }


}
