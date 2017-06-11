import * as RX from 'reactxp';
import Grader from '../appUtilities/Grader'


const styles = {
    row: RX.Styles.createViewStyle({
        flexDirection: 'row'
    }),
    entry: RX.Styles.createTextStyle({
        width: 20,
        height: 20,
        margin: 10,
        borderColor: 'black',
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 3,
        textAlign: 'center',
        textAlignVertical: 'center'
    })
}
const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface ComponentChartProps {
    questionType: string;
}

class ProgressChart extends RX.Component<ComponentChartProps, null> {

    render() {
        return (
            <RX.View>
                <RX.Text>Progress Report for {this.props.questionType}</RX.Text>
                {/*<table>
                    {this.renderTableBody()}
                </table>*/}
                <RX.View>
                    {this.renderBody()}
                </RX.View>
            </RX.View>
        )
    }
    getSign() {
        if (this.props.questionType === 'multiplication') {
            return (<RX.Text> &times; </RX.Text>);
        } else {
            return (<RX.Text> &#247; </RX.Text>);
        }
    }
    renderBody(): JSX.Element {
        return (
            <RX.View>
                <RX.View style={styles.row}>
                    <RX.Text style={styles.entry}>{this.getSign()}</RX.Text>
                    <RX.Text style={styles.entry}>1</RX.Text>
                    <RX.Text style={styles.entry}>2</RX.Text>
                    <RX.Text style={styles.entry}>3</RX.Text>
                    <RX.Text style={styles.entry}>4</RX.Text>
                    <RX.Text style={styles.entry}>5</RX.Text>
                    <RX.Text style={styles.entry}>6</RX.Text>
                    <RX.Text style={styles.entry}>7</RX.Text>
                    <RX.Text style={styles.entry}>8</RX.Text>
                    <RX.Text style={styles.entry}>9</RX.Text>
                    <RX.Text style={styles.entry}>10</RX.Text>
                </RX.View>
                {rows.map((row, index) => {
                    return this.renderViewRow(row, index);
                })}
            </RX.View>
        )
    }
    renderViewRow(b: number, index: number): JSX.Element {
        return (
            <RX.View key={index.toString()} style={styles.row}>
                <RX.Text style={styles.entry}>{b}</RX.Text>
                {rows.map((row, rowIndex) => {
                    return this.renderViewGrade(row, b, rowIndex);
                })}
            </RX.View>
        )
    }

    renderViewGrade(a: number, b: number, index: number): JSX.Element {
        const grade = Grader.Grade(this.props.questionType, a, b);

        return (
            <RX.Text key={index.toString()} style={this.getStyle(grade)}></RX.Text>
        )
    }
    getStyle(grade: Grade) {

        return RX.Styles.createTextStyle({
            backgroundColor: grade.getRGB(),
            width: 20,
            height: 20,
            margin: 10,
            borderColor: 'black',
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: Math.floor(grade.averageTime)
        }, false);

    }

    renderTableBody(): JSX.Element {
        return (
            <tbody>
                <tr>
                    <td></td>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>6</td>
                    <td>7</td>
                    <td>8</td>
                    <td>9</td>
                    <td>10</td>
                </tr>
                {rows.map((row, index) => {
                    return this.renderRow(row, index);
                })}
            </tbody>
        )
    }
    renderRow(b: number, index: number): JSX.Element {
        console.log("Rendering row " + b);

        return (
            <tr key={index}>
                <td>{b}</td>
                {rows.map((row, rowIndex) => {
                    return this.renderGrade(row, b, rowIndex);
                })}
            </tr>
        )
    }
    renderGrade(a: number, b: number, index: number): JSX.Element {
        console.log("\tRendering grade " + a + ", " + b);
        const grade = Grader.Grade(this.props.questionType, a, b);

        return (
            <td key={index} style={grade.color()}>

            </td>
        )
    }



}


export default ProgressChart;

