import{RandomDataGenerator} from '../utils/RandomGenarator.js';
export class RegisterData {

    static email=RandomDataGenerator.randomEmail();
    static firstName=RandomDataGenerator.randomString(5);
    static lastName=RandomDataGenerator.randomString(8);
    static gender=RandomDataGenerator.randomGender();
    static password=RandomDataGenerator.randomString(3)+RandomDataGenerator.randomNumber(4);

}