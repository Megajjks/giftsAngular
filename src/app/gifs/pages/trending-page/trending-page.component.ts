import { Component, inject, signal } from '@angular/core';
import GiftListComponent from '@/gifs/components/gift-list/gift-list.component';
import { GifsService } from '@/gifs/services/gifs.service';
@Component({
  selector: 'app-trending-page',
  imports: [GiftListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifsService);
 }
