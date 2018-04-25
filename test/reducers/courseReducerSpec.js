import expect from 'expect';
import courseReducer from '../../src/reducers/courseReducer';
import * as actions from '../../src/actions/courseActions';

describe('Courese Reducer', () => {
    let initialState,
        action,
        expectedState,
        actualNewState;
    function initSpec({course = { title: 'C'}} = {}) {
        initialState = [
            { title: 'A' },
            { title: 'B' },
        ];

        action = actions.createCourseSuccess(course);

        expectedState = [
            { title: 'A' },
            { title: 'B' },
            { title: 'C' },
        ];

        actualNewState = courseReducer(initialState, action);
    }

   it('should have actualNewState equal to expectedState', () => {
        initSpec();
       expect(actualNewState).toEqual(expectedState);
   });
    it('should have newState length equal to 3', () => {
        initSpec();
        expect(actualNewState.length).toBe(3);
    });
    it('should have newState 3rd course title equal to C', () => {
        initSpec();
        expect(actualNewState[2].title).toBe('C');
    });
});