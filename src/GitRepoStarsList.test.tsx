// @ts-ignore

import { shallow } from 'enzyme';
import React from 'react';

export const getTestApiResponse = (
    response: {},
    trigger: () => Promise<void>,
): Promise<{ status: number; json: () => Promise<any> }> => {
        return new Promise((resolve, reject) => {
            const fetchResponse = {
                status: 200,
                clone() {},
                json() {
                    return Promise.resolve(response);
                },
            };
            // setImmediate(() => {
            //     resolve(fetchResponse);
            // });
            trigger()
                .then(() => {
                    resolve(fetchResponse);
                });
        });
    };

// (global as any).fetch = jest.fn();
declare var global: GlobalFetch;
let mockFetchResponse: Promise<any>;
const mockFetch = jest.fn().mockImplementation(() => {
    return mockFetchResponse;
});
global.fetch = mockFetch;

jest.mock('debounce', () => ({
    debounce: (fn:Function) => fn,
}));

import { GitRepoStarsList } from './GitRepoStarsList';

it('survives when the fetch response has no items', done => {
    mockFetchResponse = getTestApiResponse({}, () => Promise.resolve());
    // const render = () => {
    //     shallow((<GitRepoStarsList language='foo' />));
    // };
    // setImmediate(() => {

    // });
    // expect(render).not.toThrow();
    // render();
    // setImmediate(() => {
    //     done();
    // });

    shallow((<GitRepoStarsList language='foo' />));

    setImmediate(() => {
        done();
    });
});
