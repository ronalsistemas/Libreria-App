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
  addArticulo(articulo: Articulo): void {
    if (articulo.id > 0) {
      //Actualizar articulo en backend
      this.service.update(articulo).subscribe(articuloUpdated => {
        //Actualizar articulo en la tabla de frontend
        this.articulos = this.articulos.map(arti => {
          if (arti.id == articulo.id) {
            return { ...articuloUpdated};
          }
          return arti;
        });
      });
    } else {
      //Guardar articulo en backend
      this.service.create(articulo).subscribe(articuloNew => {
        //Guardar articulo en la tabla de frontend
        this.articulos = [... this.articulos, { ...articuloNew }];
      })
    }
    //Activar el botón crear
    this.articuloSelected = new Articulo();
  }

  //Eliminar articulo
  onRemoveArticulo(id: number): void {
    //Eliminar articulo en backend
    this.service.remove(id).subscribe(() => {
      //Eliminar articulo en la tabla de frontend
      this.articulos = this.articulos.filter(articulo => articulo.id != id);
    })
  }

  //Seleccionar articulo para actualizar
  onUpdateArticulo(articuloRow: Articulo): void {
    this.articuloSelected = { ...articuloRow };
  }
}
