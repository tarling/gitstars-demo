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
            // tslint:disable-next-line:no-empty
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
    // tslint:disable-next-line:ban-types
    debounce: (fn: Function) => fn,
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

it('shows language in quotes when language is truthy', () => {
    const language = 'foo';
    const wrapper = shallow((<GitRepoStarsList language={language} />));
    expect(wrapper.find('.git-repo-stars-list__head').render().text().includes(`: "${language}"`)).toBe(true);
});

it('shows no quotes in head when language is null', () => {
    // because it looks bad
    const wrapper = shallow((<GitRepoStarsList language='' />));
    expect(wrapper.find('.git-repo-stars-list__head').render().text().includes(': "')).toBe(false);
});
