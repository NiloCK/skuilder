import * as RX from 'reactxp';
import Recorder from '../appUtilities/Recorder';

interface SessionReportProps {
    records: Array<any>
}

const styles = {
    correct: RX.Styles.createTextStyle({
        backgroundColor: "green"
    }),
    incorrect: RX.Styles.createTextStyle({
        backgroundColor: 'purple'
    })
}

class SessionReport extends RX.Component<SessionReportProps, null> {

    constructor(props: SessionReportProps) {
        super(props);
    }

    getSessionQuestions(records: Array<any>) {
        let sessionRecords = new Array<any>();
        let correctCount: number = 0;
        let index: number = records.length - 1;

        while (correctCount < 25) {
            if (records[index].correct) {
                correctCount++;
            }
            index--;
        }

        return records.slice(
            Math.max(0, index),
            records.length);
    }

    render() {
        const records = Recorder.getRecord();
        const truncatedRecords = this.getSessionQuestions(records);
        console.log("Rendering a session report...");
        let time: number = 0;

        truncatedRecords.forEach((record) => {
            time += record.time;
        });
        time = parseInt(time.toFixed(0));


        return (
            <RX.View>
                <ul>
                    {truncatedRecords.map(
                        (record, index) => {
                            return (<li key={index}>{this.renderRecord(record)}</li>)
                        }
                    )}
                </ul>
                {(truncatedRecords.length <= 28) ?
                    <RX.Text>
                        It took {time} seconds to do these! Can you beat this?
                    </RX.Text> :
                    null}
                <button autoFocus onClick={() => { window.location.reload(); }}>Try again!</button>
            </RX.View>
        )
    }
    renderRecord(record: Object): JSX.Element {
        if (record.q === 'multiplication') {
            return (
                <RX.Text style={record.correct ? styles.correct : styles.incorrect}>
                    {record.a} &times; {record.b} = {record.answer}   (in {record.time} s)
                </RX.Text>
            )
        } else {
            return (
                <RX.Text style={record.correct ? styles.correct : styles.incorrect}>
                    {record.a * record.b} &#247; {record.b} = {record.answer}   (in {record.time} s)
                </RX.Text>
            )
        }
    }
}

export default SessionReport;