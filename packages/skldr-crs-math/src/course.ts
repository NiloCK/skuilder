import MultiplicationType from './questions/multiplication'
import DivisionType from './questions/division'

// export.Multiplication = Multiplication;
// export.Division = Division;

module Course {
    export type Multiplication = MultiplicationType;
    // export var Multiplication: typeof MultiplicationType;

    export type Division = DivisionType;
    // export var Division: typeof DivisionType;
    // export var Multiplication = new Multiplication();

    // export type Division = Division;
    // export var Division = new Division();

    export const types = [
        MultiplicationType,
        DivisionType
    ]
}

export default Course;