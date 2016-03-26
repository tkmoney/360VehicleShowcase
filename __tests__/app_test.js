jest.dontMock('../app/scripts/ui/ThreeSixtyControl');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const ThreeSixtyControl = require('../app/scripts/ui/ThreeSixtyControl');


describe('ThreeSixtyControl component', () => {

    it('should go to next frame after next button click', () => {
        var threeSixtyControl = TestUtils.renderIntoDocument(<ThreeSixtyControl bodysprite="../app/images/cars/car1/bodies/body1/body.png" wheelsprite="../app/images/cars/car1/wheels/wheels1/wheels.png" />);

        var next_button = TestUtils.findRenderedDOMComponentWithClass(threeSixtyControl, 'next_button');

        console.log('threeSixtyControl.state: ', threeSixtyControl.state);

        //test
        expect(threeSixtyControl.state.currentFrame).toBe(0);

        TestUtils.Simulate.click(next_button);

        //test
        expect(threeSixtyControl.state.currentFrame).toBe(1);
    });


    it('should go forward in frames when clicked and dragged to the left', () => {
        var threeSixtyControl = TestUtils.renderIntoDocument(<ThreeSixtyControl bodysprite="../app/images/cars/car1/bodies/body1/body.png" wheelsprite="../app/images/cars/car1/wheels/wheels1/wheels.png" />);

        var container_elm = TestUtils.findRenderedDOMComponentWithClass(threeSixtyControl, 'threesixty_container');

        //test
        expect(threeSixtyControl.state.currentFrame).toBe(0);

        TestUtils.Simulate.mouseDown(container_elm, {
            type: 'mousedown',
            screenX: 100
        });

        TestUtils.Simulate.mouseMove(container_elm, {
            type: 'mousemove',
            screenX: 33
        });

        TestUtils.Simulate.mouseUp(container_elm);


        //test
        expect(threeSixtyControl.state.currentFrame).toBeGreaterThan(0);

    });


});
