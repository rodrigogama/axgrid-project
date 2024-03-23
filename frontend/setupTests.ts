import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResizeObserver from "resize-observer-polyfill";
import { server } from "./src/__mocks__/server";

global.console = {
  ...console,
  error: vi.fn(),
};

global.ResizeObserver = ResizeObserver;

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  cleanup();
});

afterAll(() => {
  server.close();
});
