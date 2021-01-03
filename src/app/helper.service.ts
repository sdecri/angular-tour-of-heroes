import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  // Helper
  public StringIsNumber = (value: string) => isNaN(Number(value)) === false;

  // Turn enum into key value pair object
  public toObject(e: { [key: string]: string; }): {
    [key: number]: string;
  } {
    const o: { [key: number]: string; } = {};
    for (const [key, value] of Object.entries(e)) {
      if (this.StringIsNumber(key)) {
        const numberKey: number = +key;
        o[numberKey] = value;
      }
    }
    return o;
  }
}
