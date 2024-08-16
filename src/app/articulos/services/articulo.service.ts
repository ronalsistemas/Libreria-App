import { Injectable } from '@angular/core';
import { Articulo } from '../models/articulo';
import { Observable, of } from 'rxjs';

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

  constructor() { }
  //Listar productos
  findAll(): Observable<Articulo[]> {
    return of(this.articulos);
  }
}
