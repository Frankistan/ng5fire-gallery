import { trigger, state, animate, transition, style } from '@angular/animations';

export const scaleAnimation =
    trigger('scaleAnimation', [

        transition(':enter', [

            // styles at start of transition
            style({ opacity: 0, transform: 'scale(0.4)' }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1, transform: 'scale(1.0)' }) )
        ]),
    ]);
