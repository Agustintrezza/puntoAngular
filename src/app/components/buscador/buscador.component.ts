import { Component, OnInit } from '@angular/core';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { debounceTime, Subject } from 'rxjs'

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  public direcciones : Array<any>=[];
  public filtro_direcciones = '';
  hayError: boolean = false;

  debouncer : Subject<string> = new Subject();

  constructor(
    private _direccionesService : DireccionesService,
  ) { }

  ngOnInit(): void {
    this.init_Data();
    this.debouncer
    .pipe (
      debounceTime(300)
    )
    .subscribe( valor => {
      if(valor.length >= 5) {
        console.log('Consulto')
        this.init_Data();
      } if (valor.length >= 0) {
        this.ocultar();
        console.log('Esta en 0')
      }
       else {
        console.log('No Consulta')
        // this.hayError = false;
      }
      // console.log('debouncer:', valor);
    });
  }
  init_Data(){
    this.hayError = false;
    this._direccionesService.listar_direcciones_filtro(this.filtro_direcciones).subscribe(

      response=>{
        
        this.direcciones = response;
        console.log(this.direcciones)
        /* setTimeout(()=>{
          
        },3000) */
      },
      error=>{
        console.log(error);
        this.hayError = true;
        // window.document.getElementById('container').style.display = "none";
      }
    );
  }

  filtro(){

   console.log(this.filtro_direcciones);

   this._direccionesService.listar_direcciones_filtro(this.filtro_direcciones).subscribe(
    response=>{
      
      this.direcciones = response;

      if(this.direcciones.length == 0) {
        console.log('Error')
        this.hayError = true;
         setTimeout(()=>{
          this.hayError = false;
      },3000) 
        
      }else {
        this.hayError = false;
      }

      console.log(this.direcciones)
      /* setTimeout(()=>{
        
      },3000) */
    },
    error=>{
      console.log(error);
    }
  );
  }

  teclaPresionada() {
    this.debouncer.next (this.filtro_direcciones);
  }

  ocultar() {
    console.log('Holaaaa')
    // document.querySelector('container').style.display = "none";
  }

}
