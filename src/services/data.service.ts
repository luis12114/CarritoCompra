import { Injectable } from '@angular/core';
import { apiServers } from './apiServers';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl:string =apiServers.serverUlr;

  constructor(private http:HttpClient) { }

  getData(){
   return this.http.get(`${this.apiUrl}`)
  }
}
