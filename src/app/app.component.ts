import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PersonaService} from './service/persona.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'umg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  title = 'AngularProyect';

  // definir "FormGroup" para ingreso de datos por formulario
  public formGroup: FormGroup;

  constructor(private personaService: PersonaService) {

  }

  public onClick(): void {
    console.log('on click');
  }


  public enviarFormulario(): void {
    console.log('Datos de formulario:' + JSON.stringify(this.formGroup.value));

    let parametros: any = null;
    parametros = Object.assign({}, this.formGroup.value);

    let datosAEnviar: any = {
      primerNombre: parametros.nombre,
      segundoNombre: parametros.apellido,
      edad: parametros.edad,
      direccion: parametros.direccion,
      telefono: parametros.telefono,
    };

    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));

    this.personaService.create(datosAEnviar).subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
    });
  }


  public actualizarFormulario(): void {

    let parametros: any = null;
    parametros = Object.assign({}, this.formGroup.value);

    let datosAEnviar: any = {
      primerNombre: parametros.nombre,
      segundoNombre: parametros.apellido,
      edad: parametros.edad,
      direccion: parametros.direccion,
      telefono: parametros.telefono,
    };

    console.log('Datos a enviar:' + JSON.stringify(datosAEnviar));

    this.personaService.update(datosAEnviar).subscribe(result => {
      console.log('Datos from server:' + JSON.stringify(result));
    });
  }



  private initForm(): void {
    this.formGroup = new FormGroup({
      nombre: new FormControl('', []
      ),
      apellido: new FormControl('', []
      ),
      edad: new FormControl('', []
      ),
      direccion: new FormControl('', []
      ),
      telefono: new FormControl('', []
      )
    });


  }

  ngAfterViewInit(): void {
    console.log('on after view');
  }

  ngOnDestroy(): void {
    console.log('on destroy');
  }

  ngOnInit(): void {

    console.log('on init');

    // iniciar formulario
    this.initForm();

    // ejecutar llamada de servicio restful al iniciar la aplicacion
    this.personaService
      .personaList(null)
      .subscribe((result) => {
        console.log('RESULTADO:' + JSON.stringify(result));
      });
  }


}
