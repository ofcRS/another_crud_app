import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MockedProvider } from '@apollo/client/testing';

import { ModalBody } from '../AuthModal';

jest.mock('store', () => require('../__mocks__/useStore'));

configure({ adapter: new Adapter() });

it('must render normal', () => {
    const modal = mount(<ModalBody />, {
        wrappingComponent: MockedProvider,
    });
    const title = modal.find('h2');
    expect(title.text()).toEqual('Login');
});
it('must change mode on click mode button', () => {
    const modal = mount(<ModalBody />, {
        wrappingComponent: MockedProvider,
    });
    const changeModeButton = modal.find('button').last();
    expect(changeModeButton.text()).toEqual('Sign In');
    changeModeButton.simulate('click');
    expect(
        modal
            .find('button')
            .last()
            .text()
    ).toEqual('Log in');
});
