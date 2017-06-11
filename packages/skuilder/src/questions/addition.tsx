import * as RX from 'reactxp';
import Recorder from '../appUtilities/Recorder'

interface SingleDigitAdditionProblemProps extends RX.CommonProps {
    a: number;
    b: number;
    db: Recorder;
}

class SingleDigitAdditionProblem extends RX.Component<SingleDigitAdditionProblemProps, null> {
    a: number;
    b: number;

    constructor(props: SingleDigitAdditionProblemProps) {
        super(props);

        this.a = props.a;
        this.b = props.b;
    }

    render() {
        return (
            <RX.View>
                {this.a} + {this.b} = ___
            </RX.View>
        );
    }
}

export default SingleDigitAdditionProblem;