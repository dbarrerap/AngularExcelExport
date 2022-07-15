import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
    providedIn: 'root'
})
export class ExampleTableService {
    constructor(private api: ApiService) { }

    getData() {
        return this.api.apiCall('https://jsonplaceholder.typicode.com/users', 'GET')
    }
}