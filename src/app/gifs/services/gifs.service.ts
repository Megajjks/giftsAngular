import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import type { GiphyResponse } from "../interfaces/giphy.interfaces";
import { environment } from "@environments/environment";
import { map, of } from "rxjs";
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from "../mapper/gif.mapper";

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private http = inject(HttpClient);
   trengdingGifs = signal(<Gif[]>[]);
   loaderGifs = signal(false);
  constructor() {
    this.loadTrendingGifs();
  }

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

  searchGifs(query: string) {
    return this.http.get<GiphyResponse>(`${environment.GIPHY_API_URL}/gifs/search`,{
      params: {
        api_key: environment.GIPHY_API_KEY,
        q: query,
        limit: '20',
      }
    }).pipe(
      map(({data})=> GifMapper.mapGiphyItemsToGifs(data))
      // todo : histroy search
    )
  }
}
