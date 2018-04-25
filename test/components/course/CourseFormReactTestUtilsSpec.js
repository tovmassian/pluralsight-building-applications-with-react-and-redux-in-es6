import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CourseForm from '../../../src/components/courses/CourseForm';

function initSpec({saving = false} = {}) {
    let props = {
        course: {},
        saving: saving,
        errors: {},
        onSave: () => {},
        onChange: () => {},
    };
    let renderer = TestUtils.createRenderer();
    renderer.render(<CourseForm {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer,
    };
}

describe('CourseForm via React Test Utils', () => {
    it('renders form and h1', () => {
        const { output } = initSpec();
        expect(output.type).toBe('form');
        let [ h1 ] = output.props.children;
        expect( h1.type).toBe('h1');
    });
    describe('save button', () => {
        it('should be labeled "Save" if not saving', () => {
            const { output } = initSpec();
            let props = output.props.children;
            expect(props[props.length - 1].props.value).toBe('Save');
        });

        it('should be labeled "Saving..." if not saving', () => {
            const { output } = initSpec({saving: true});
            let props = output.props.children;
            expect(props[props.length - 1].props.value).toBe('Saving...');
        });
    });
});