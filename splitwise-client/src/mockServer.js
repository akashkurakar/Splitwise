/* eslint-disable arrow-body-style */
// import dependencies
import React from 'react';

// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// import react-testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
// declare which API requests to mock
const server = setupServer(
  rest.get('/api/login', (req, res, ctx) => res(ctx.json({ greeting: 'hello there' })))
);

// establish API mocking before all tests
beforeAll(() => server.listen());
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());
// clean up once the tests are done
afterAll(() => server.close());

// ...

test('handlers server error', async () => {
  server.use(
    // override the initial "GET /greeting" request handler
    // to return a 500 Server Error
    rest.get('/greeting', (_req, res, ctx) => res(ctx.status(500)))
  );

  // ...
});
