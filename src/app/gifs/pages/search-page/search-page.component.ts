import { Component, inject, signal } from '@angular/core';
import { GifsService } from '@/gifs/services/gifs.service';
import { Gif } from '@/gifs/interfaces/gif.interface';
import GiftListComponent from '@/gifs/components/gift-list/gift-list.component';

@Component({
  selector: 'app-search-page',
  imports: [GiftListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {

  gifservice = inject(GifsService);
  gifs = signal(<Gif[]>([]))

  onSearch(query: string){
  this.gifservice.searchGifs(query).subscribe((resp)=>{
    this.gifs.set(resp);
  });
  }
}
