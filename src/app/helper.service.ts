import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  // Helper
  public StringIsNumber = (value: string) => isNaN(Number(value)) === false;

}
