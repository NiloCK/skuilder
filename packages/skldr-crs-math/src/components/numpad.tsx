import * as RX from 'reactxp';
import Keybinder from '../appUtilities/Keybinder'
import FingerCounter from './fingerCounter/fingerCounter'

export interface NumpadProps extends RX.CommonProps {
    num: number;
    // counted?: number;
}
interface NumpadState {
    counted?: number;
}

const styles = {
    row: RX.Styles.createViewStyle({
        flexDirection: 'row',
        backgroundColor: "white",
    }, false)
}

const keys = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3],
    [0]
];

const highlights: Array<Array<number>> = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
    [2, 4, 6, 8, 0, 2, 4, 6, 8, 0],
    [3, 6, 9, 2, 5, 8, 1, 4, 7, 0],
    [4, 8, 2, 6, 0, 4, 8, 2, 6, 0],
    [5, 0, 5, 0, 5, 0, 5, 0, 5, 0],
    [6, 2, 8, 4, 0, 6, 2, 8, 4, 0],
    [7, 4, 1, 8, 5, 2, 9, 6, 3, 0],
    [8, 6, 4, 2, 0, 8, 6, 4, 2, 0],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

class Numpad extends RX.Component<NumpadProps, NumpadState> {
    private UIbindings: Keybinder;

    constructor(props: NumpadProps) {
        super();

        this.UIbindings = new Keybinder([
            {
                binding: 'left',
                callback: (e: ExtendedKeyboardEvent) => {
                    this.setState({
                        counted: Math.max(0, (this.state.counted - 1))
                    })
                }
            },
            {
                binding: 'right',
                callback: (e: ExtendedKeyboardEvent) => {
                    this.setState({
                        counted: Math.min(10, (this.state.counted + 1))
                    });
                }
            }
        ])

        this.state = {
            counted: 0
        }
    }

    shouldComponentUpdate(nextProps: NumpadProps, nextState: NumpadState) {
        if (nextProps) {
            this.setState({
                counted: 0
            })
        }
        return true;
    }

    componentDidMount() {
        this.UIbindings.bind();
    }

    componentWillUnmount() {
        this.UIbindings.unbind();
    }

    render() {
        const num = this.props.num;
        const counted = this.state.counted;

        return (
            <RX.View>
                <div>
                    {keys.map((keyrow, index) => {
                        return this.renderKeyRow(keyrow, index);
                    })}
                </div>
                <FingerCounter counted={counted} />
            </RX.View>
        )
    }

    renderKeyRow(keys: Array<number>, index: number) {
        const style = RX.Styles.createViewStyle({
            flexDirection: "row",

        }, false)

        return (
            <RX.View style={style} key={index} >
                {keys.map((key, index) => {
                    return this.renderKey(key, index);
                })
                }
            </RX.View >
        )
    }

    renderKey(key: number, index: number) {
        return (
            <RX.Text style={this.getKeyStyle(key)} key={index}> {key} </RX.Text>
        );
    }
    getKeyStyle(key: number) {
        return RX.Styles.createTextStyle({
            borderStyle: "solid",
            borderColor: "black",
            borderWidth: 1,
            borderRadius: 4,
            padding: 4,
            margin: 3,
            backgroundColor: this.getBackgroundColor(key)
        }, false);
    }

    getBackgroundColor(key: number): string {
        if (highlights[this.props.num][this.state.counted - 1] == key) {
            return 'green';
        }

        return 'white';
    }
}

export default Numpad;