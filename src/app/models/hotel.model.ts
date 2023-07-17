export class Hotel {
  constructor(
    public _id: String,
    public nombre: String,
    public direccion: String,
    public telefono: String,
    public idGerente: {},
    public Habitaciones: [{}],
    public Servios:[{}],
    public Huespedes:[{}]
  ) {}
}
