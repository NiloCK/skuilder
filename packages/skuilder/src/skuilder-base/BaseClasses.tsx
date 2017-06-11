import * as RX from 'reactxp';
import * as Moment from 'moment';
import Recorder from '../appUtilities/Recorder'

abstract class Viewable<P extends RX.CommonProps> extends RX.Component<RX.CommonProps, null> {
    startTime: Moment.Moment;
    props: P;

    abstract render(): JSX.Element;

    init(): void {
        this.startTime = Moment();
    }
    timeSinceStart(): number {
        const now = Moment();
        const milliseconds = now.diff(this.startTime)
        return milliseconds / 1000;
    }

    constructor(props: RX.CommonProps) {
        super(props);
    }
}

interface PropsDefinition {
    props: Array<PropDefinition<any>>;
}

interface NumberPropDefinition extends PropDefinition<number> {
    min: number;
    max: number;

    int?: boolean;
}

interface PropDefinition<T> {
    type: keyof T;
    name: string; // the name of the property
}

interface QProps<Q> extends RX.CommonProps {
    onanswer: Function,

}

export abstract class Question {
    static PropsDefinition: PropsDefinition;

    abstract isCorrect(answer: any): boolean;
}

// spitballing....
// class Subtraction extends Question<{
//     props: [
//         { type: keyof number, name: 'minuend', max: 10 }
//     ]
// }>
// {
//     listProps() {
//         let c = (typeof this);

//     }

// }

interface ClassConstructor extends Function {
    name: string
}

export abstract class QuestionView<P extends QuestionViewProps> extends Viewable<QuestionViewProps> {
    attempts: number;
    static readonly staticThing: number = 5; //?
    props: P;

    init(): void {
        super.init();
        this.attempts = 0;
    }

    readonly componentDidMount = (): void => {
        this.init();
    }

    userAnswer(): any {
        let input = document.getElementById('answer') as HTMLInputElement;
        return parseInt(input.value);
    };
    isCorrect(): boolean {
        return this.props.question.isCorrect(
            this.userAnswer()
        );
    }


    constructor(props: RX.CommonProps) {
        super(props);
    }

    submit(e): void {
        e.preventDefault();
        this.attempts++;

        const input = document.getElementById('answer') as HTMLInputElement;
        const userans = parseInt(input.value);
        const isCorrect = this.isCorrect();

        let a = this;

        Recorder.addRecord({
            q: (this.constructor as ClassConstructor).name,
            props: this.strippedProps(),
            answer: this.userAnswer(),
            isCorrect: isCorrect,
            attempts: this.attempts,
            time: this.timeSinceStart()
        })

        input.value = "";
        this.animate(isCorrect);

        if (isCorrect) {
            this.props.onanswer();
        }
    }


    /**
     * Removes functions from the components props, so that the props can be pouched
     */
    strippedProps(): Object {
        let strippedProps: KeyedObject = {};

        Object.keys(this.props).forEach((key) => {
            let prop: any = this.props[key];

            if (typeof (prop) != 'function') {
                strippedProps[key] = prop;
            }
        });

        return strippedProps;
    }

    animate(correct: boolean) {//todo do this in a react-way
        let questionDiv = document.getElementById("question");

        questionDiv.classList.add("correct-" + correct); // see /src/styles/answerStyles.css

        setTimeout(function () { // remove the class so that it can be reapplied
            questionDiv.classList.remove("correct-true", "correct-false")
        }, 1000);
    }
}

interface KeyedObject extends Object {
    [key: string]: any
}

export interface QuestionViewProps extends RX.CommonProps {
    onanswer: Function,
    question: Question,
    [key: string]: any
}

/**
 * The record of a completed question.
 */
export interface QuestionRecord {
    q: string, // the ClassName of the question
    props: any,
    answer: any,
    isCorrect: boolean,
    attempts: number,
    time: number // milliseconds
    [key: string]: any
}
