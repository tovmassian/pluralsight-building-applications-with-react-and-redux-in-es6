import expect from 'expect';
import * as courseActions from '../../src/actions/courseActions';
import * as types from '../../src/actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Course Actions', () => {
    describe('createCourseSuccess', () => {
        const course = { id:'', watchHref: '', title: '', authorId: '', length: '', category: '' };
        let createCourseSuccessAction,
            expectedAction;
        function initSpec() {
            createCourseSuccessAction = {
                type: types.CREATE_COURSE_SUCCESS,
                course,
            };
            expectedAction = courseActions.createCourseSuccess(course);
        }
        it('should have expectedAction to be equal to createCourseSuccessAction', () => {
            initSpec();
            expect(expectedAction).toEqual(createCourseSuccessAction);
        });
    });

    describe('loadCoursesSuccess', () => {
        const courses = [
            { id:'1', watchHref: '', title: 'A', authorId: '', length: '', category: '' },
            { id:'2', watchHref: '', title: 'B', authorId: '', length: '', category: '' },
         ];
        let loadCoursesSuccessAction,
            expectedAction;
        function initSpec() {
            loadCoursesSuccessAction = {
                type: types.LOAD_COURSES_SUCCESS,
                courses,
            };
            expectedAction = courseActions.loadCoursesSuccess(courses);
        }
        it('should have expectedAction to be equal to loadCoursesSuccessAction', () => {
            initSpec();
            expect(expectedAction).toEqual(loadCoursesSuccessAction);
        });
    });
    describe('Async Actions', () => {
        afterEach(() => {
            nock.cleanAll();
        });
        describe('loadCourses', () => {
            let actions,
                store,
                expectedActions;
            function initSpec() {
                // nock('http://example.com')
                //     .get('/courses')
                //     .reply(200, { body : { courses: [ {}, {} ] } });
                expectedActions = [
                    { type: types.BEGIN_AJAX_CALL },
                    { type: types.LOAD_COURSES_SUCCESS, body: { courses: [ { id: '1', title: 'New Course' } ] } },
                ];

                store = mockStore({ courses: [] }, expectedActions);
            }

            it('should first action type be equal to BEGIN_AJAX_CALL', (done) => {
                initSpec();
                store.dispatch(courseActions.loadCourses()).then(() => {
                    actions = store.getActions();
                    expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                });
                done();
            });

            it('should first action type be equal to LOAD_COURSES_SUCCESS', (done) => {
                initSpec();
                store.dispatch(courseActions.loadCourses()).then(() => {
                    actions = store.getActions();
                    expect(actions[1].type).toEqual(types.LOAD_COURSES_SUCCESS);
                }).catch((error) => {
                    throw(error);
                });
                done();
            });
        });

        describe('saveCourses', () => {
            let actions,
                store,
                course,
                saveAction,
                expectedActions;
            function initSpec({hasCourseId = false} = {}) {
                // nock('http://example.com')
                //     .get('/courses')
                //     .reply(200, { body : { courses: [ {}, {} ] } });
                course = { title: 'New Course A' };
                if (hasCourseId) {
                    course.id = 10;
                }
                saveAction = hasCourseId ? { type: types.UPDATE_COURSE_SUCCESS, body: course } : { type: types.CREATE_COURSE_SUCCESS, body: course };

                expectedActions = [
                    { type: types.BEGIN_AJAX_CALL },
                    saveAction,
                ];

                store = mockStore({ courses: [] }, expectedActions);
            }

            it('should have first action type equal to BEGIN_AJAX_CALL', (done) => {
                initSpec();
                store.dispatch(courseActions.saveCourse(course)).then(() => {
                    actions = store.getActions();
                    expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                }).catch((error) => {
                    throw(error);
                });
                done();
            });

            it('should have first action type equal to UPDATE_COURSE_SUCCESS', (done) => {
                initSpec({hasCourseId: true});
                store.dispatch(courseActions.saveCourse(course)).then(() => {
                    actions = store.getActions();
                    expect(actions[1].type).toEqual(types.UPDATE_COURSE_SUCCESS);
                }).catch((error) => {
                    throw(error);
                });
                done();
            });
        });
    });
});