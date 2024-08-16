import { Component, OnInit } from '@angular/core';
import { Articulo } from '../models/articulo';
import { ArticuloService } from '../services/articulo.service';
import { FormComponent } from './form.component';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.css'
})
export class ArticuloComponent implements OnInit {
  articulos: Articulo[] = [];

  articuloSelected: Articulo = new Articulo();

  constructor(private service: ArticuloService) { }

  //Trae los datos del backend para la lista
  ngOnInit(): void {
    this.service.findAll().subscribe(articulos => this.articulos = articulos);
  }

  //Agregar producto a la lista
  addArticulo(articulo: Articulo){
    if (articulo.id > 0) {
      //Actualizar articulo
      this.articulos = this.articulos.map(arti => {
        if (arti.id == articulo.id) {
          return { ...articulo };
        }
        return arti;
      })
    } else {
      //Guardar articulo
    this.articulos = [... this.articulos, { ...articulo, id: new Date().getTime() }];
    }
    //Activar el botón crear
    this.articuloSelected = new Articulo();
  }

  //Eliminar articulo
  onRemoveArticulo(id: number): void {
    this.articulos = this.articulos.filter(articulo => articulo.id != id);
  }

  //Seleccionar articulo para actualizar
  onUpdateArticulo(articuloRow: Articulo): void {
    this.articuloSelected = {... articuloRow};
  }
}
