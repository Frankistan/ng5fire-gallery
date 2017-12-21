import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { fadeInAnimation } from '../../animations/fade-in.animation';
import { scaleAnimation } from '../../animations/scale.animation';
import { slideUpFadeIn } from '../../animations/slide-up-fade-in';

@Component({
    selector: 'app-profile-info',
    templateUrl: './profile-info.component.html',
    styleUrls: ['./profile-info.component.css'],
    animations: [fadeInAnimation, scaleAnimation, slideUpFadeIn],
    // host: { '[@fadeInAnimation]': '' }
})
export class ProfileInfoComponent {

    constructor(
        public auth: AuthService,
    ) { }
}
