export default class ServiceWorkUpdateDto {
  constructor(serviceWork) {
    this.codigo = serviceWork.codigo;
    this.nombre = serviceWork.nombre;
    this.codiart = serviceWork.codiart;
    this.descart = serviceWork.descart;
    this.accesorios = serviceWork.accesorios;
    this.falla = serviceWork.falla;
    this.serie = serviceWork.serie;
    this.prioridad = serviceWork.prioridad;
  }
}
