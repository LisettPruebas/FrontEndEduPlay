import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasService, Pregunta } from '../../services/preguntas/pregunta';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; //para manejar formularios reactivos.
// ¿Qué son los formularios reactivos?
// Son formularios que se definen y controlan completamente desde el TypeScript, no desde el HTML. Usan clases como FormGroup, FormControl y FormArray para construirlos y validarlos.
// ¿Por qué usar formularios reactivos?
// Más control:	Tenés control total desde el código TypeScript, podés reaccionar a cambios, aplicar lógica condicional y validar de forma avanzada.
// Validaciones dinámicas:	Podés agregar o quitar validaciones según condiciones.
// Más testeo:	Son más fáciles de testear que los formularios basados en templates.
// Escalabilidad:	Se adaptan mejor a formularios grandes y/o dinámicos (como encuestas, tests, formularios con campos condicionales, etc.).
// Estructura clara:	Se ve más claro cómo está compuesto el formulario desde el código.
// Reutilización:	Podés reutilizar funciones para crear campos, validaciones o estructuras.

@Component({
  selector: 'app-listar-preguntas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './listar-preguntas.html',
  styleUrls: ['./listar-preguntas.css']
})
export class ListarPreguntas implements OnInit {

  preguntas: Pregunta[] = [];

  formulario!: FormGroup; //el grupo reactivo para crear/editar preguntas.

  preguntaEnEdicion: Pregunta | null = null; // guarda si estás editando una pregunta (null si creas nueva).

  constructor(private preguntasService: PreguntasService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerPreguntas(); //Se cargan las preguntas desde el backend.

    this.formulario = this.fb.group({
      pregunta: ['', Validators.required],
      opciones: this.fb.array([ //this.fb.array crea un FormArray
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
        // this.fb.group crea un FormGroup, Es un grupo de controles que se puede validar, resetear, etc. Es más limpio y claro que crear cada control uno por uno.
      ]),
      // Se inicializa el formulario con:
      // Campo pregunta obligatorio.
      // Array opciones con 4 controles vacíos y obligatorios.
      // Campo respuestaCorrecta obligatorio.
      respuestaCorrecta: ['', Validators.required]
    });

    // se puede mejorar para hacerlo más limpio, reutilizable y escalable, Código mejorado:

    // this.formulario = this.fb.group({
    //   pregunta: ['', Validators.required],
    //   opciones: this.fb.array(this.crearControlesOpciones(4)),
    //   respuestaCorrecta: ['', Validators.required]
    // });

    // ➕ Y agregás esta función auxiliar en la clase:
    // private crearControlesOpciones(cantidad: number): FormControl[] {
    //   return Array.from({ length: cantidad }, () =>
    //     this.fb.control('', Validators.required)
    //   );
    // }
    // 💡 ¿Qué mejora esto?
    // Reutilización:	Si mañana querés 3, 5 u 8 opciones, solo cambiás un número.
    // Legibilidad:	El ngOnInit() queda más limpio.
    // Mantenimiento:	Si las validaciones cambian, solo tocás un lugar.
    // Escalabilidad:	Podés usar la función en otros formularios también.
  }

  get opciones() {
    return this.formulario.get('opciones') as FormArray;
  }
  // Permite acceder fácil al array de opciones para manipularlo (agregar, eliminar, modificar).

  obtenerPreguntas() { //Llamada al servicio obtenerPreguntas()
    this.preguntasService.obtenerPreguntas().subscribe({
      // devuelve un Observable que emite datos (la respuesta HTTP). Se usa .subscribe() para recibir esos datos.
      next: (data) => {
        // // Aquí se maneja la estructura que llega, porque puede ser arreglo, objeto o un solo elemento. Cuando llegan los datos (data), el código analiza qué tipo de datos es para asignarlos correctamente a this.preguntas.
        if (Array.isArray(data)) { //Si data ya es un arreglo, se asigna directamente.
          this.preguntas = data;
        } else if (data && typeof data === 'object' && !Array.isArray(data)) {
          // ¿Qué significa esta condición?
          // data && → Verifica que data no sea null ni undefined (que tenga algún valor).
          // typeof data === 'object' → Que data sea un objeto (puede ser un objeto simple o un arreglo).
          // !Array.isArray(data) → Que data no sea un arreglo (porque arreglos también son objetos en JS).
          // En resumen: Esta condición detecta que data es un objeto plano, no un arreglo.

          const values = Object.values(data).filter(v => typeof v === 'object') as Pregunta[];

          // Si es un objeto pero no arreglo:
          // Obtiene sus valores con Object.values(data).
          // Filtra solo los valores que también sean objetos.
          // Verifica si en ese arreglo filtrado el primer objeto tiene la propiedad 'pregunta'.

          // Object.values(objeto) devuelve un arreglo con todos los valores que tiene ese objeto, sin las claves.Por ejemplo:
          //   const obj = { a: {pregunta: 'P1'}, b: {pregunta: 'P2'}, c: 123 };
          //   Object.values(obj); // Devuelve: [{pregunta: 'P1'}, {pregunta: 'P2'}, 123]

          // ¿Qué hace .filter(v => typeof v === 'object')?
          // Filtra esos valores para quedarse sólo con los que sean objetos. En el ejemplo anterior, eliminaría el 123 porque no es objeto.

          // ¿Por qué hacer esto?
          // Porque a veces el backend devuelve un objeto con claves dinámicas que contienen los datos importantes (las preguntas).

          // Con Object.values sacás solo esos datos, y con el filtro asegurás que sean objetos válidos.

          // Luego, se castea (como as Pregunta[]) para decirle a TypeScript que esos valores son preguntas.


          if (values.length > 0 && 'pregunta' in values[0]) {
            this.preguntas = values;
            // Si sí, asigna ese arreglo values a this.preguntas.
          } else if ('pregunta' in data) {
            this.preguntas = [data as Pregunta];
            // Si no, verifica si el mismo objeto data tiene propiedad 'pregunta'. Si sí, lo envuelve en un arreglo para asignar [data].
          } else {
            this.preguntas = []; //Si no cumple ninguna de esas, asigna arreglo vacío.
          }
        } else {
          this.preguntas = []; //Si no cumple nada anterior, asigna arreglo vacío.
        }
      },
      error: (err) => console.error('Error al obtener preguntas', err)
    });
  }
  // ¿Por qué hacer esta comprobación tan detallada?
  // Para asegurarse que this.preguntas siempre sea un arreglo de preguntas y evitar errores en la UI que espera un array.

  // El backend puede devolver datos en formatos diferentes según contexto o error, entonces el frontend se prepara para esas variantes

  // Un arreglo es una estructura ordenada y iterable
  // Cuando querés mostrar una lista de preguntas en el HTML, por ejemplo usando *ngFor="let p of preguntas", Angular necesita que preguntas sea un arreglo para poder iterar y crear una tarjeta, fila o elemento por cada pregunta.

  // Un objeto no se puede iterar directamente en Angular
  // Si preguntas fuera un objeto (por ejemplo {id1: {...}, id2: {...}}), no podrías usar directamente *ngFor porque Angular no sabe iterar objetos (solo iterar arrays).

  // Aunque existe la forma de iterar objetos (con keyvalue pipe), no es lo común ni lo más simple para mostrar listas.

  // Modelos y lógica de negocio
  // Para manejar la colección de preguntas, en código es más natural trabajar con un arreglo porque podés aplicar métodos como .map(), .filter(), .find(), .sort(), etc.

  // Si fuera un objeto, tendrías que convertirlo a arreglo para usar esas funciones fácilmente.

  crearPregunta() {
    if (this.formulario.invalid) {
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    const nuevaPregunta: Pregunta = {
      pregunta: this.formulario.value.pregunta,
      opciones: this.formulario.value.opciones,
      respuestaCorrecta: this.formulario.value.respuestaCorrecta
    };
    // Crea una pregunta nueva tomando los valores que el usuario cargó en el formulario.
    // Tiene tres campos: pregunta, opciones[] (4 en total), y la respuestaCorrecta.

    const opcionesValidas = nuevaPregunta.opciones.every(opt => opt.trim() !== '');
    if (!opcionesValidas) {
      alert('Todas las opciones deben estar completas');
      return;
    }

    const opcionesUnicas = new Set(nuevaPregunta.opciones.map(opt => opt.trim().toLowerCase()));
    if (opcionesUnicas.size !== nuevaPregunta.opciones.length) {
      alert('Las opciones deben ser distintas entre sí');
      return;
    }
    // usa un Set para ver si hay opciones repetidas. Si hay duplicadas (por ejemplo: "perro" y "Perro"), se lanza un error y se corta.

    const respuestaCoincide = nuevaPregunta.opciones
      .map(opt => opt.trim().toLowerCase())
      .includes(nuevaPregunta.respuestaCorrecta.trim().toLowerCase());
    if (!respuestaCoincide) {
      alert('La respuesta correcta debe coincidir exactamente con una de las opciones');
      return;
    }

    const peticion = this.preguntaEnEdicion && this.preguntaEnEdicion._id
    ? this.preguntasService.actualizarPregunta(this.preguntaEnEdicion._id, nuevaPregunta)
    : this.preguntasService.crearPregunta(nuevaPregunta);
    // Si hay una preguntaEnEdicion, llama al método para actualizar. Si no, llama a crear nueva.

    peticion.subscribe({
      next: (res) => {
        alert(this.preguntaEnEdicion ? 'Pregunta actualizada' : 'Pregunta creada');

        if (this.preguntaEnEdicion) {
          const index = this.preguntas.findIndex(p => p._id === this.preguntaEnEdicion!._id);
          if (index !== -1) {
            this.preguntas[index] = { ...this.preguntaEnEdicion, ...nuevaPregunta };
          }
        } else {
          this.preguntas.push(res);
        }

        this.resetFormulario();
      },
      error: (err) => {
        console.error('Error al guardar', err);
        alert('Error al guardar la pregunta');
      }
    });
  }
  // Espera la respuesta del backend (.subscribe).
  // Si todo sale bien, muestra un mensaje. Si fue una edición, actualiza la lista existente. Si fue nueva, la agrega al arreglo preguntas.

  editarPregunta(pregunta: Pregunta) {
    this.preguntaEnEdicion = pregunta;

    this.formulario.patchValue({
      pregunta: pregunta.pregunta,
      respuestaCorrecta: pregunta.respuestaCorrecta
    });

    while (this.opciones.length) this.opciones.removeAt(0);
    for (const opcion of pregunta.opciones) {
      this.opciones.push(this.fb.control(opcion, Validators.required));
    }
  }

  eliminar(id?: string) {
    if (!id) {
      alert('ID inválido');
      return;
    }
    if (confirm('¿Seguro que querés eliminar esta pregunta?')) {
      this.preguntasService.eliminarPregunta(id).subscribe({
        next: () => {
          alert('Pregunta eliminada');
          this.obtenerPreguntas();
        },
        error: (err) => {
          console.error('Error al eliminar pregunta', err);
          alert('Error al eliminar la pregunta');
        }
      });
    }
  }

  resetFormulario() {
   this.formulario.reset();
   this.preguntaEnEdicion = null; //Se borra la referencia a una posible pregunta que estaba en modo edición. Esto indica que ya no se está editando nada, sino creando una nueva pregunta.

   while (this.opciones.length) this.opciones.removeAt(0);
  //  Elimina todas las opciones existentes del FormArray.
  //  Esto se hace porque reset() no limpia los elementos del array, solo sus valores.
   for (let i = 0; i < 4; i++) {
      this.opciones.push(this.fb.control('', Validators.required));
    }
  }
  //agrega 4 campos nuevos vacíos, todos requeridos.Esto prepara el formulario para crear una nueva pregunta desde cero.

}
// ¿Por qué se hace todo esto?
// Porque si solo hicieras reset(), quedarías con un FormArray vacío o con estructura rota, o con valores anteriores. Así se asegura que:

// Siempre haya 4 opciones.

// Estén vacías.

// Estén listas para ser validadas de nuevo.