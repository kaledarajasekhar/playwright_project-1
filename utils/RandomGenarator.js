export class RandomDataGenerator {

    static randomString(length = 8) {

        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

        let result = '';

        for (let i = 0; i < length; i++) {

            result += characters.charAt(
                Math.floor(
                    Math.random() * characters.length
                )
            );
        }

        return result;
    }

    static randomNumber(length = 4) {

        const numbers = '0123456789';

        let result = '';

        for (let i = 0; i < length; i++) {

            result += numbers.charAt(
                Math.floor(
                    Math.random() * numbers.length
                )
            );
        }

        return result;
    }

    static randomEmail() {

        return (
            this.randomString(8) +
            this.randomNumber(4) +
            '@gmail.com'
        );
    }

    static randomGender() {

        const genders = [
            'Male',
            'Female'
        ];

        return genders[
            Math.floor(
                Math.random() * genders.length
            )
        ];
    }
}