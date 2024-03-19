import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'liked',
  standalone: true,
})
export class LikedPipe implements PipeTransform {
  transform(value: any, userId: any): unknown {
    return value.some((el: any) => {
      return el.userId == userId;
    });
  }
}
