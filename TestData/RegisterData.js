import { RandomDataGenerator } from '../utils/RandomGenarator.js';

export class RegisterData {

    constructor() {
        this.email = RandomDataGenerator.randomEmail();
        this.firstName = RandomDataGenerator.randomString(5);
        this.lastName = RandomDataGenerator.randomString(8);
        this.gender = RandomDataGenerator.randomGender();
        this.password = RandomDataGenerator.randomString(3) + RandomDataGenerator.randomNumber(4);
    }

}