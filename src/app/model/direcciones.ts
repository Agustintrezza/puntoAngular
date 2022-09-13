export class Direcciones {

    constructor(obj?: any) {
        Object.assign(this, obj);
    }

    direccion: string = '';
    nombre_calle: string = '';
    nombre_partido: string = '';

}