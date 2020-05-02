export class Bookings {

    constructor (
        public id: string,
        public placeId: string,
        public placeTitle: string,
        public guestNumber: number,
        public firstName: string,
        public lastName: string,
        public bookingFrom: Date,
        public bookingTo: Date,
        public userID: string
    ) { }

}