import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private url: string = 'http://localhost:8009/api/v1/articulos';

  constructor(private http: HttpClient) { }

  //Listar articulos consumiendo api desde el backend
  findAll(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.url);
  }

  //Guardar articulos consumiendo api desde el backend
  create(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.url, articulo);
  }

  //Actualizar articulos consumiendo api desde el backend
  update(articulo: Articulo): Observable<Articulo> {
    return this.http.put<Articulo>(`${this.url}/${articulo.id}`, articulo);
  }

  //Eliminar articulos consumiendo api desde el backend
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`)
  }

}
