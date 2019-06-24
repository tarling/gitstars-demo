// @ts-ignore

import { shallow } from 'enzyme';
import React from 'react';

export const getTestApiResponse = (
    response: {},
    trigger: () => Promise<void>,
): Promise<{ status: number; json: () => Promise<any> }> => {
    return new Promise(resolve => {
        const fetchResponse = {
            status: 200,
            clone() {},
            json() {
                return Promise.resolve(response);
            },
        };
        setImmediate(() => {
            resolve(fetchResponse);
        });
        trigger()
            .then(() => {
                resolve(fetchResponse);
            });
    });
};

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
    const trigger = () => new Promise(resolve => {
        resolve();
    }) as Promise<void>;
    mockFetchResponse = getTestApiResponse({}, trigger);
    shallow((<GitRepoStarsList language='foo' />));
    trigger()
        .then(() => {
            setImmediate(done);
        });
});
