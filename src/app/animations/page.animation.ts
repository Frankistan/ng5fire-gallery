import { trigger, stagger, animate, style, group, query, transition } from '@angular/animations';

export const pageAnimation = trigger('pageAnimation', [
    transition(':enter', [
        query('.group .image, .group .upload-area', style({ transform: 'translateY(-50px)', opacity: 0 })),
        query('.group', [
            stagger(300, [
                query('.image, .upload-area', [
                    stagger(100, [
                        animate('800ms cubic-bezier(.35,0,.25,1)', style('*'))
                    ])
                ])
            ])
        ])
    ]),

])
