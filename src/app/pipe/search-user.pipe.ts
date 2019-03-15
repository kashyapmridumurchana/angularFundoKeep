import { Pipe, PipeTransform } from '@angular/core';
import { user } from '../core/model/user/user';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users:user[] , searchValue: any): any {
    console.log(users, searchValue);
    if (!searchValue) {
      return users;
    }
    else {
      return users.filter(({emailId}) => {
        return emailId.includes(searchValue);
      });
    }

  // transform(values: any[], key: string, value: string): any[] {
  //   // debugger;

  //   if (!values) {
  //     return [];
  //   }
  //   if (!value) {
  //     return values;
  //   }
  //   return values.filter(val => val.emailId === value);
  // }

  // transform(allHeroes: user[]) {
  //   return allHeroes.filter(hero => hero.emailId);
  // }

   }
 }
