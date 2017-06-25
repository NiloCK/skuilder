import Multiplication from './questions/multiplication'
import { Division } from './questions/division'

// export.Multiplication = Multiplication;
// export.Division = Division;

module Course {
    export type Multiplication = Multiplication;
    export var Multiplication = new Multiplication();

    export type Division = Division;
    export var Division = new Division();
}

export = Course;