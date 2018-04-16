import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            course: Object.assign({}, this.props.course),
            errors: {},
        };

        this.updateCourseState = this.updateCourseState.bind(this);
        this.saveCourse = this.saveCourse.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.course || this.props.course.id !== nextProps.course.id) {
            // Necessary to populate form when existing course is loaded directly from URL
            this.setState({course: Object.assign({}, nextProps.course)});
        }
    }

    updateCourseState(event) {
        const field = event.target.name;
        let course = this.state.course;
        course[field] = event.target.value;
        return this.setState({course: course});
    }

    saveCourse(event) {
        event.preventDefault();
        this.props.actions.saveCourse(this.state.course);
        this.context.router.push('/courses');
    }

    render() {
        return (
            <CourseForm
                course={this.state.course}
                allAuthors={this.props.authors}
                onChange={this.updateCourseState}
                onSave={this.saveCourse}
                errors={this.state.errors}
            />
        );
    }
}

ManageCoursePage.propTypes = {
    course: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
};

ManageCoursePage.contextTypes = {
    router: PropTypes.object.isRequired,
};
function getCourseById(courses, courseId) {
    const course = courses.filter(course => course.id === courseId);
    return course ? course[0] : null;
}
function mapStateToProps(state, ownProps) {
    const courseId = ownProps.params.id;

    let course = {id:'', watchHref: '', title: '', authorId: '', length: '', category: ''};

    if (courseId) {
        course = getCourseById(state.courses, courseId);
    }
    const authorFormattedForDropdown = state.authors.map(author => {
        return {
            value: author.id,
            text: author.firstName + ' ' + author.lastName,
        };
    });

    return {
        course,
        authors: authorFormattedForDropdown,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(courseActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);