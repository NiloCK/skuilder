import * as RX from 'reactxp';
import { QuestionView, QuestionViewProps, Question } from 'skldr-course-base'

const styles = {
    form: RX.Styles.createViewStyle({
        flexDirection: "row",
        padding: 15
    })
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}; //todo move this somewhere sensible (or find a lib?)

export class SingleDigitAdditionQuestion extends Question {
    a: number = getRandomInt(0, 10);
    b: number = getRandomInt(0, 10);

    isCorrect(answer: number) {
        return this.a + this.b == answer;
    }
}
export interface SingleDigitAdditionQuestionProps extends QuestionViewProps {
    question: SingleDigitAdditionQuestion;
}

class SingleDigitAdditionProblemView extends QuestionView<SingleDigitAdditionQuestionProps>{
    static getProps(): SingleDigitAdditionQuestionProps {
        return {
            onanswer: null,
            question: new SingleDigitAdditionQuestion()
        }
    }

    render() {
        let { question } = this.props;

        return (
            <RX.View>

                <RX.View style={styles.form}>

                    <div id="question">
                        {question.a} + {question.b} =&nbsp;
                    </div>
                    <form onSubmit={this.submit.bind(this)}>
                        <input className="mousetrap"
                            autoFocus
                            id="answer" type="number" autoComplete={false} />
                    </form>

                </RX.View>
            </RX.View>
        );
    }
}

export default SingleDigitAdditionProblemView;