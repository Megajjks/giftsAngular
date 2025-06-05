import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GifsService } from '@/gifs/services/gifs.service';
import { ScrollStateService } from '@/shared/services/scroll-state.service';
@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;
    // Set initial scroll position from the service
    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    const margin = 150; // Margin to trigger loading more content

    const isAtBottom = scrollTop + clientHeight + margin >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);
    if (isAtBottom) {
      this.gifService.loadTrendingGifs();
    }
    //console.log({isAtBottom, scrollTop, clientHeight, scrollHeight, total:scrollTop + clientHeight + margin});
  }
}
