import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { environment } from "@environments/environment";
import { map, Observable, tap } from "rxjs";
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from "../mapper/gif.mapper";

const GIF_KEYS = "gifs";
const loadFromLocalStorage = () =>{
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEYS) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}


@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject(HttpClient);
   trengdingGifs = signal(<Gif[]>[]);
   trendingGifGroup = computed<Gif[][]>(() => {
    const groups = []
    for (let i = 0; i < this.trengdingGifs().length; i += 3) {
      groups.push(this.trengdingGifs().slice(i, i + 3))
    }
    return groups;
   })
   loaderGifs = signal(false);
   searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
   searchHistoryKeys = computed(()=> Object.keys(this.searchHistory()))


  constructor() {
    this.loadTrendingGifs();
  }

  saveGifsToLocalStorage = effect(()=>{
    const historyString = JSON.stringify(this.searchHistory());
     localStorage.setItem(GIF_KEYS, historyString);
  })

  loadTrendingGifs(){
    this.http.get<GiphyResponse>(`${environment.GIPHY_API_URL}/gifs/trending`,{
      params: {
        api_key: environment.GIPHY_API_KEY,
        limit: '20',
        offset: '0',
        ratting: 'g',
        bundle:"messaging_non_clips"
      }
    }).subscribe((resp)=>{
      const gifs = GifMapper.mapGiphyItemsToGifs(resp.data);
      this.loaderGifs.set(false);
      this.trengdingGifs.set(gifs);
    })
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.GIPHY_API_URL}/gifs/search`,{
      params: {
        api_key: environment.GIPHY_API_KEY,
        q: query,
        limit: '20',
      }
    }).pipe(
      map(({data})=> GifMapper.mapGiphyItemsToGifs(data)),
      tap((items)=>{
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    )
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
