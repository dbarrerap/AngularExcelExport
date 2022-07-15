import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient,) { }

  public apiCall(url: string, method: string, data?: any) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" })
    switch (method) {
      case 'GET':
        return this.http.get(url)
      case 'POST':
        return this.http.post(url, data, { headers: headers })
    }
    return
  }
}
