import Recorder from './Recorder'

export default class Grader {
    static Grade(qType: string, a: number, b: number) {
        const records = Recorder.getRecord();

        let qCount: number = 0;
        let index: number = records.length - 1;

        let scorables = new Array<any>();

        while (qCount < 6 && index >= 0) {
            if (records[index].q === qType &&
                records[index].a === a &&
                records[index].b === b &&
                records[index].correct) {
                scorables.push(records[index]);
            }
            index--;
        }

        let totalAttempts = 0;
        let totalTime = 0;

        scorables.forEach((answer) => {
            totalAttempts += answer.attempts;
            totalTime += answer.time;
        })


        return new Grade(
            (scorables.length / totalAttempts),
            (totalTime / scorables.length)
        );
    }
}

export class Grade {
    isValid: boolean;
    score: number;
    averageTime: number;

    constructor(score: number, time: number) {
        this.score = score;
        this.averageTime = time;

        if (isNaN(score) || isNaN(time)) {
            this.isValid = false;
        } else {
            this.isValid = true;
        }
    }
    toString(): string {
        if (this.isValid) {
            return this.score.toFixed(2).toString();
        } else {
            return "";
        }
    }
    getRGB(): string {
        const score = this.score * this.score;

        if (this.isValid) {
            return "rgb(" +
                Math.floor(255 * Math.min(1, 2 - 2 * score)) + "," +   // red
                Math.floor(255 * Math.min(1, 2 * score)) +             // green
                ", 0)"; // blue
        } else {
            return "white";
        }
    }
}