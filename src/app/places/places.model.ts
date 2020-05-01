export class Places {
    constructor (
        public id: string,
        public title: string,
        public description: string,
        public imageURL: string,
        public price: number,
        public availableFrom: Date,
        public availabeleto: Date,
        public userID: string
    ) { }
}
