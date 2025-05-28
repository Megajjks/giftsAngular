import { Gif } from "../interfaces/gif.interface";
import { GyphyItem } from "../interfaces/giphy.interfaces";

export class GifMapper {
  static mapGiphyItemToGif(item: GyphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url,
    }
  }
  static mapGiphyItemsToGifs(items: GyphyItem[]): Gif[] {
    return items.map(item => this.mapGiphyItemToGif(item));
  }
}
