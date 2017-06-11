import * as RX from 'reactxp';
// import img1 from './img/1.PNG'; // image-webpack-loader ?

export interface FingerCounterProps extends RX.CommonProps {
    counted: number;
}

const styles = {
    img: RX.Styles.createViewStyle({
        height: 120,
        width: 150
    })
}


class FingerCounter extends RX.Component<FingerCounterProps, null> {

    constructor(props: FingerCounterProps) {
        super(props);
    }


    render() {
        if (this.props.counted === 0) {
            return (
                <RX.View style={styles.img}></RX.View>
            )
        } else {
            return (
                <RX.View style={styles.img}>
                    <img className="finger" src={"img/fingerCounter/" + this.props.counted + ".PNG"} alt="" />
                </RX.View>
            )
        }
    }
}

export default FingerCounter;