import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { map, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  private articulos: Articulo[] = [
    {
      id: 1,
      nombre: 'Cuaderno',
      descripcion: 'Tiene hojas doble raya',
      precio: 7
    },
    {
      id: 2,
      nombre: 'Borrador',
      descripcion: 'Es de color blanco',
      precio: 2
    }
  ];

  private url: string = 'http://localhost:8080/products';

  constructor(private http: HttpClient) { }

  //Listar articulos consumiendo api desde el backend
  findAll(): Observable<Articulo[]> {
    return this.http.get(this.url).pipe(
      map((response: any) => response._embedded.products as Articulo[]),
    );
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
