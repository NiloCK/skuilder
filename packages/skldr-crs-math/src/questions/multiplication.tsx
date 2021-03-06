import * as RX from 'reactxp';
import Numpad from '../components/numpad';
import { QuestionView, QuestionViewProps, Question } from 'skldr-course-base'
import * as rand from '../util/rand'

const styles = {
    form: RX.Styles.createViewStyle({
        flexDirection: "row",
        padding: 15
    })
}

export class SingleDigitMultiplicationQuestion extends Question {
    a: number = rand.getRandomInt(0, 10);
    b: number = rand.getRandomInt(0, 10);

    isCorrect(answer: number) {
        return (this.a * this.b == answer);
    }
}

export interface SingleDigitMultiplicationQuestionProps extends QuestionViewProps {
    question: SingleDigitMultiplicationQuestion
}


class SingleDigitMultiplicationProblemView extends QuestionView<SingleDigitMultiplicationQuestionProps> {

    static getProps(): SingleDigitMultiplicationQuestionProps {
        return {
            onanswer: null,
            question: new SingleDigitMultiplicationQuestion()
        };
    }

    render() {
        let { question } = this.props;

        return (
            <RX.View>

                <RX.View style={styles.form}>

                    <div id="question">
                        {question.a} &times; {question.b} =&nbsp;
                    </div>
                    <form onSubmit={this.submit.bind(this)}>
                        <input className="mousetrap"
                            autoFocus
                            id="answer" type="number" autoComplete={false} />
                    </form>
                    {/*<RX.TextInput ref="answer2"
                        onSubmitEditing={() => console.log("I'm being submitted")}
                        autoFocus
                        keyboardType="numeric"
                        autoCorrect={false}
                        onKeyPress={null}>
                    </RX.TextInput>
                    <TextInput > </TextInput>*/}

                </RX.View>
                <Numpad num={question.b} />
            </RX.View>
        );
    }
}

export default SingleDigitMultiplicationProblemView;