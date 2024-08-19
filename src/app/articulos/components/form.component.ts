import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Articulo } from '../models/articulo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'articulo-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  //Aparece los valore por defecto en los controles del formulario
  @Input() articulo: Articulo = {
    id: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
  };

  @Output() newArticuloEvent = new EventEmitter();

  //Registrar articulo
  onSubmit(articuloForm: NgForm): void {
    if (articuloForm.valid) {
      this.newArticuloEvent.emit(this.articulo);
      console.log(this.articulo);
    }
    articuloForm.reset();
    articuloForm.resetForm();
  }

  //Limpiar formulario
  clean(): void {
    this.articulo = {
      id: 0,
      nombre: '',
      descripcion: '',
      precio: 0,
    }
  }
}
