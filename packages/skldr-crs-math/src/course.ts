import MultiplicationType from './questions/multiplication'
import DivisionType from './questions/division'
import Addition from './questions/addition'
import Subtraction from './questions/subtraction'

module Course {
    export const types = [
        MultiplicationType,
        DivisionType,
        Addition,
        Subtraction
    ]
}

export default Course;