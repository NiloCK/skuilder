import * as RX from 'reactxp';
import Numpad from '../components/numpad';
import { Question, QuestionView, QuestionViewProps } from '../skuilder-base/BaseClasses'

interface SingleDigitDivisionProblemProps extends QuestionViewProps {
    question: SingleDigitDivisionQuestion
}

class SingleDigitDivisionQuestion extends Question {
    a: number = getRandomInt(0, 10);
    b: number = getRandomInt(1, 10);

    isCorrect(answer: number) {
        return answer == this.a;
    }
}

const styles = {
    form: RX.Styles.createViewStyle({
        flexDirection: "row",
        padding: 15
    })
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class SingleDigitDivisionProblemView extends QuestionView<SingleDigitDivisionProblemProps> {

    static getProps(): SingleDigitDivisionProblemProps {
        return {
            question: new SingleDigitDivisionQuestion(),
            onanswer: null
        };
    }

    render() {
        let { a, b } = this.props.question;

        return (
            <RX.View>

                <RX.View style={styles.form}>

                    <div id="question">
                        {a * b} &#247; {b} =&nbsp;
                    </div>
                    <form onSubmit={this.submit.bind(this)}>
                        <input className="mousetrap"
                            autoFocus
                            id="answer" type="number" autoComplete={false} />
                    </form>
                </RX.View>
                <Numpad num={b} />
            </RX.View>
        );
    }

}

export default SingleDigitDivisionProblemView;