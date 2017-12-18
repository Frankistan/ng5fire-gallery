import { Component } from '@angular/core';
import { ImageService } from '../../shared/services/image.service';
import { CoreService } from '../../shared/services/core.service';

@Component({
    selector: 'sort-by-btn',
    templateUrl: './sort-by-btn.component.html'
})
export class SortByBtnComponent {
    order: string = "";
    display: boolean = false;

    constructor(
        public imageService: ImageService,
        private coreSrv: CoreService
    ) {
        this.coreSrv.currentPath.subscribe((path) => {
            this.display = path === "images";
        });
    }

    orderBy(mode: string) {
        this.order = this.order == "" ? 'reverse' : "";
        this.imageService.sortBy.next({ sortBy: mode, order: this.order });
    }

}
