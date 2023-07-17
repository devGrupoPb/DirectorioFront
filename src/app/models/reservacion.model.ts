export class Reservacion {
    constructor(
        public _id: string,
        public idUsuario: {},
        public idHabitacion: [{}],
        public idHotel:{},
        public numeroDias:Number,
        public estado:Boolean,
    ) {}
  }
  