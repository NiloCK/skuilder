import * as RX from 'reactxp';
import Numpad from '../components/numpad';
import { Question, QuestionView, QuestionViewProps } from 'skldr-course-base'
import * as rand from '../util/rand'

export interface SingleDigitDivisionProblemProps extends QuestionViewProps {
    question: SingleDigitDivisionQuestion
}

export class SingleDigitDivisionQuestion extends Question {
    a: number = rand.getRandomInt(0, 10);
    b: number = rand.getRandomInt(1, 10);

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