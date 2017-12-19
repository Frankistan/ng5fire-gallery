import { trigger, stagger, animate, style, group, query, transition, animateChild } from '@angular/animations';

export const routerAnimations = trigger('routerAnimations', [
    transition('settings => home', [
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        query(':leave', style({ zIndex: 100 })),
        query(':enter', style({ transform: 'translateY(100%)' })),

        group([
            query(':leave', group([
                animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(-100%)' })), // y: '-100%'
                animateChild()
            ])),
            query(':enter', group([
                animate('500ms cubic-bezier(.35,0,.25,1)', style({ transform: 'translateY(0%)' })),
                animateChild()
            ]))
        ])
    ]),
    transition('home => settings', [
        query(':enter, :leave',
            style({ position: 'absolute', top: 0, left: 0, right: 0 })),
        query(':enter', [
            style({ opacity: 0, transform: 'translateX(100%)' }),
            query('mat-card', [
                style({ opacity: 0, transform: 'scale(0)' })
            ])
        ]),

        query(':leave', [
            query('mat-card', [
                stagger(50, [
                    animate('500ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0, transform: 'translateY(-50px)' }))
                ])
            ]),
            animate('800ms cubic-bezier(.35,0,.25,1)', style({ opacity: 0, transform: 'translateX(-100%)' }))
        ]),

        group([
            query(':enter', [
                animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
            ]),
            query(':enter mat-card', [
                stagger(200, [
                    animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
                ])
            ])
        ])
    ])
])
