import expect from 'expect';
import React from 'react';
import { mount, shallow } from 'enzyme';
import CourseForm from '../../../src/components/courses/CourseForm';

function initSpec({saving = false} = {}) {
    let props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => {},
        onChange: () => {},
    };

    return shallow(<CourseForm {...props}/>);
}

describe('CourseForm via Enzyme', () => {
    it('renders form and h1', () => {
        const wrapper = initSpec();
        expect(wrapper.find('form').length).toBe(1);
        expect(wrapper.find('h1').text()).toBe('Manage Course');
    });
    describe('save button', () => {
        it('should be labeled "Save" if not saving', () => {
            const wrapper = initSpec();
            expect(wrapper.find('input').props().value).toBe('Save');
        });

        it('should be labeled "Saving..." if not saving', () => {
            const wrapper = initSpec({saving: true});
            expect(wrapper.find('input').props().value).toBe('Saving...');
        });
    });
});