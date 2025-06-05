import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import GiftListComponent from '@/gifs/components/gift-list/gift-list.component';
import { GifsService } from '@/gifs/services/gifs.service';
@Component({
  selector: 'app-trending-page',
  imports: [GiftListComponent],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent {
  gifService = inject(GifsService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const margin = 150; // Margin to trigger loading more content

    const isAtBottom = scrollTop + clientHeight + margin >= scrollHeight;
    console.log({isAtBottom, scrollTop, clientHeight, scrollHeight, total:scrollTop + clientHeight + margin});
 }
}
