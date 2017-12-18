import { Component } from '@angular/core';
import { ImageService } from '../shared/services/image.service';
import { CoreService } from '../shared/services/core.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

    isSearching: boolean = false;

    constructor(
        private imageSrv: ImageService,
        private coreSrv: CoreService,
    ) {}

    search(searchText: string) {
        this.imageSrv.search.next({ name: searchText });
    }

    closeSearch() {
        this.isSearching = false;
        this.coreSrv.isSearching.next(this.isSearching);
        this.imageSrv.search.next({ name: "" });
    }
}
