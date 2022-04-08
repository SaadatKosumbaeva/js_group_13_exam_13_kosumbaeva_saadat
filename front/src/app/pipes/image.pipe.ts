import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value) {
      return env.apiUrl + '/' + value;
    }

    return '/assets/images/no_image_available.jpg';
  }
}
