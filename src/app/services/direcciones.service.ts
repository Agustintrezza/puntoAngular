import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Direcciones } from "../model/direcciones";

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  private apiUrl: string = 'http://servicios.usig.buenosaires.gob.ar/normalizar?direccion='

  constructor(
    private _http: HttpClient,
  ) { }

  listar_direcciones_filtro(filtro_direcciones:string):Observable<Direcciones[]>{
    let url = `${this.apiUrl + filtro_direcciones}`;
    return this._http
    .get(url)
    .pipe( 
      map((data: any = []) => data.direccionesNormalizadas.map((item: any) => new Direcciones(item)))
    )
  }
}
