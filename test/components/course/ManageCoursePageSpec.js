import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { ManageCoursePage } from '../../../src/components/courses/ManageCoursePage';

describe('Manage Course Page', () => {
    const props = {
        course: { id: '', watchHref: '', authorId: '', title: '', length: '', category: '' },
        authors: [],
        actions: { saveCourse: () => { return Promise.resolve(); } },
    };
    it('sets error message when trying to save an empty title', () => {
        const wrapper = mount(<ManageCoursePage {...props} />);
        const saveButton = wrapper.find('input').last();
        expect(saveButton.prop('type')).toBe('submit');
        saveButton.simulate('click');
        expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
    });
});