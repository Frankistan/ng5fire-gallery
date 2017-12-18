import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../shared/services/auth.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    constructor(
        private auth: AuthService,
        private snackBar: SnackbarService,
        private formBuilder: FormBuilder,
    ) {
        this.resetForm = this.formBuilder.group({
            email: ['fffernandez84@gmail.com', [Validators.required, Validators.email]]
        });
    }

    ngOnInit() {
    }

    resetPassword(email: string) {
        this.auth.resetPassword(email)
            .then(success => { this.snackBar.open('toast.reset_pwd', 'toast.close'); })
            .catch(error => { this.snackBar.open('toast.firebase.' + error.code, 'toast.close'); });
    }

}
