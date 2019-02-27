import { Injectable } from '@angular/core';

@Injectable()
export class ObjectService {
  clone(obj: object, clean: boolean = false): object {
    const newObj = { ...obj };

    Object.keys(newObj).map(key => {
      if (newObj[key] instanceof Array) {
        if (clean) {
          const newArray = [];
          obj[key].forEach(item => {
            newArray.push(this.clone(item, clean));
          });
          newObj[key] = newArray;
        } else {
          newObj[key] = [...obj[key]];
        }
      } else if (newObj[key] instanceof Object) {
        newObj[key] = this.clone(obj[key], clean);
      } else if (clean) {
        newObj[key] = undefined;
      }
    });

    return newObj;
  }
}
