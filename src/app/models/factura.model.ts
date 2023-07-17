export class Factura {
    constructor(
      public _id: string,
      public nombre: String,
      public Habitaciones:[{}],
      public Servicios: [{}],
      public TotalPaguar: Number
    ) {}
  }