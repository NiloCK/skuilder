/*
* This file demonstrates a basic ReactXP app.
*/

import * as RX from 'reactxp'
import Keybinder from './appUtilities/Keybinder'
import Recorder from './appUtilities/Recorder'

import SessionReport from './components/sessionReport';
import ProgressChart from './components/ProgressChart';

import MathCrs from 'skldr-crs-math';

const styles = {
    container: RX.Styles.createViewStyle({
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    }),
    helloWorld: RX.Styles.createTextStyle({
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 28
    }),
    welcome: RX.Styles.createTextStyle({
        fontSize: 32,
        marginBottom: 12
    }),
    instructions: RX.Styles.createTextStyle({
        fontSize: 16,
        color: '#aaa',
        marginBottom: 40
    }),
    docLink: RX.Styles.createLinkStyle({
        fontSize: 16,
        color: 'blue',
        marginBottom: 40
    }),
    toggleTitle: RX.Styles.createTextStyle({
        fontSize: 16,
        color: 'black'
    })
};

enum ViewState {
    QUESTIONS,
    REPORT,
    PROGRESS
}

interface AppState {
    record?: Array<Object>
    sessionQcount?: number
    viewState?: ViewState
}

function randDigit() {
    return getRandomInt(0, 10);
};

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

class App extends RX.Component<null, AppState> {
    private _translationValue: RX.Animated.Value;
    private _animatedStyle: RX.Types.AnimatedTextStyleRuleSet;
    private UIBindings: Keybinder;

    newQuestion() {

        this.setState({
            record: this.state ? this.state.record : Recorder.getRecord(),
            sessionQcount: this.state ? (this.state.sessionQcount + 1) : 0
        });

        if (this.state.sessionQcount >= 25) {
            //window.alert("You've done " + this.state.sessionQcount + " questions! Great! Have some free time!");
            this.setState({
                viewState: ViewState.REPORT
            })
        }
    }

    constructor() {
        super();

        this._translationValue = new RX.Animated.Value(-10);
        this._animatedStyle = RX.Styles.createAnimatedTextStyle({
            transform: [
                {
                    translateY: this._translationValue
                }
            ]
        });
        this.UIBindings = new Keybinder([
            {
                binding: "/",
                callback: (e: ExtendedKeyboardEvent) => {
                    console.log("Toggling report state");

                    if (this.state.viewState === ViewState.QUESTIONS) {
                        this.setState({
                            viewState: ViewState.REPORT
                        })
                    } else {
                        this.setState({
                            viewState: ViewState.QUESTIONS
                        })
                    }
                }
            },
            {
                binding: "?",
                callback: (e: ExtendedKeyboardEvent) => {
                    console.log("Toggling progress state");

                    this.setState({
                        viewState: ViewState.PROGRESS
                    })
                }
            }
        ])


        this.state = {
            record: Recorder.getRecord(),
            sessionQcount: 0,
            viewState: ViewState.QUESTIONS
        };

    }

    componentDidMount() {
        this.UIBindings.bind();

        let animation = RX.Animated.timing(this._translationValue, {
            toValue: 0,
            easing: RX.Animated.Easing.OutBack(),
            duration: 500
        }
        );

        animation.start();
    }

    render(): JSX.Element | null {
        return (

            <RX.View style={styles.container}>
                <RX.Animated.Text style={[styles.helloWorld, this._animatedStyle]}>
                    AHHHHHH!
                        </RX.Animated.Text>
                <RX.Text style={styles.welcome}>
                    Let's get a little practice with our multiplication and division facts.
                        </RX.Text>

                {(this.state.viewState === ViewState.REPORT) ?
                    <SessionReport records={this.state.record} /> :
                    null}

                {(this.state.viewState === ViewState.QUESTIONS) ?
                    (<RX.Text style={styles.toggleTitle}>
                        Use the RIGHT and LEFT Arrow Keys to move on the numberpad and help with counting-by!
                    </RX.Text>) : null
                }

                {(this.state.viewState === ViewState.QUESTIONS) ?
                    this.renderCurrentQ() : null
                }

                {(this.state.viewState === ViewState.PROGRESS) ?
                    (<ProgressChart questionType="multiplication" />) :
                    null
                }


            </RX.View>
        );
    }

    renderCurrentQ(): JSX.Element | null {
        console.log("Trying to render the current question:");

        // const Question = qTypes[getRandomInt(0, 1)];
        const Question = MathCrs.types[
            getRandomInt(0, MathCrs.types.length - 1)
        ];

        let questionProps = Question.getProps();
        questionProps.onanswer = this.newQuestion.bind(this);

        return <Question {...questionProps} onanswer={this.newQuestion.bind(this)} />

    }

    // Note that we define this as a variable rather than a normal method. Using this
    // method, we prebind the method to this component instance. This prebinding ensures
    // that each time we pass the variable as a prop in the render function, it will
    // not change. We want to avoid unnecessary prop changes because this will trigger
    // extra work within React's virtual DOM diffing mechanism.
    // private _onChangeToggle = (newValue: boolean) => {
    //     this.setState({ toggleValue: newValue });
    // }
}

export = App;
