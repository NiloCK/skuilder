import * as RX from 'reactxp';
import { QuestionView, QuestionViewProps, Question } from 'skldr-course-base'
import * as rand from '../util/rand'

const styles = {
    form: RX.Styles.createViewStyle({
        flexDirection: "row",
        padding: 15
    })
}

export class SingleDigitSubtractionQuestion extends Question {
    a: number = rand.getRandomInt(0, 10);
    b: number = rand.getRandomInt(0, 10);

    isCorrect(answer: number) {
        return this.b == answer;
    }
}
export interface SingleDigitSubtractionQuestionProps extends QuestionViewProps {
    question: SingleDigitSubtractionQuestion;
}

class SingleDigitSubtractionProblemView extends QuestionView<SingleDigitSubtractionQuestionProps>{
    static getProps(): SingleDigitSubtractionQuestionProps {
        return {
            onanswer: null,
            question: new SingleDigitSubtractionQuestion()
        }
    }

    render() {
        let { question } = this.props;

        return (
            <RX.View>

                <RX.View style={styles.form}>

                    <div id="question">
                        {question.a + question.b} &minus; {question.a} =&nbsp;
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

export default SingleDigitSubtractionProblemView;