import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from 'src/app/modelo/ClientElement';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getStates(): Observable<any[]> {
    return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  }

  getCities(estado: string): Observable<any[]> {
    return this.http.get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + estado + '/municipios');
  }

  insertPerson(pessoa: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>('http://localhost:3000/pessoas', pessoa);
  }

  getPerson(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>('http://localhost:3000/pessoas');
  }

  deletePerson(codigo: number): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/pessoas/' + codigo);
  }

  updatePerson(pessoa: ClientModel): Observable<any> {
    return this.http.put<ClientModel>('http://localhost:3000/pessoas/' + pessoa.id, pessoa);
  }
}
