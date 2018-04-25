import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../src/reducers';
import initialState from '../../src/reducers/initialState';
import * as courseActions from '../../src/actions/courseActions';

describe('Store', () => {
    let store,
    course,
    action,
    expectedStore;

   function initSpec () {
       store = createStore(rootReducer, initialState);
       course = {
           title: 'New Course',
       };

       action = courseActions.createCourseSuccess(course);
       store.dispatch(action);

       expectedStore = store.getState();
   }

   it('should have course with title "New Course" in the store', () => {
       initSpec();
      expect(expectedStore.courses[0].title).toBe('New Course');
   });
});