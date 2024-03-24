## Getting Started

### Prerequisites

- Node.js (version 21 or newer)
- Yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/rodrigogama/axgrid-project.git
```

2. Navigate to the project directory:

```bash
cd axgrid-project
```

3. Install dependencies:

```bash
yarn
```

### Setting .env

Create a `.env` file inside `/frontend` directory with the following content. A `.env.example` file is also available with the same content.

```
VITE_SERVER_BASE_URL=http://localhost:3001
VITE_API_BASE_URL=http://localhost:3001/api
```

### Running

In the root directory, run the following command. It will start both the backend and the frontend.

```bash
yarn dev
```

By default, the backend is accessible at `http://localhost:3001/api`; while the frontend is available locally at `http://localhost:5173/`.

#### Tests and Coverage

The following commands run all unit tests. The second one also provides the coverage of each test.

```bash
yarn test
```

```bash
yarn test:coverage
```

### Usage

Open more than one tab and play with adding energy offerings, updating status in order to check real time updates on the other tabs. Using just one tab will update the application too.

## Application Architecture Overview

The application is built with Vite, ensuring a smooth development experience. The architecture used in this project is designed to provide a smooth development experience, ensure reliable testing, and enable modular and scalable application growth.

### Core Technologies

- **Backend**

  - **Node.js/Express**: Provides the server environment and RESTful API endpoints
  - **Socket.io Server**: Manages WebSocket connections, broadcasting data changes to connected clients in real-time
  - **JSON-server**: Handles data storage and provide routes and data with ease

- **Frontend**
  - **Vite**: Used for fast builds and Hot Module Replacement (HMR)
  - **Vitest**: Employed for unit testing
  - **MSW (Mock Service Worker)**: Utilized for mocking API requests in tests
  - **Axios**: For making HTTP requests
  - **Socket.io**: For facilitating WebSocket communication
  - **React Query**: For managing server state
  - **Tailwindcss**: For rapid styling
  - **React Router DOM**: For handling routing

### Folder Structure (frontend) and Key Components

#### `src/__mocks__`

Contains mock data, MSW handlers for simulating API requests in tests, and MSW server configuration. With these mocks in place, there is no need to mock axios or any other fetcher, as the API calls will be intercepted by MSW and return a mock response json. This behavior brings our tests to a closer implementation of what a user would have.

#### `src/components`

- `lib`: Atomic, reusable components potentially extractable into a library.
- Other application-specific, and more complex components.

#### `src/domains`

Domain typings that define the shape of data, facilitating type checking.

#### `src/infrastructure`

Encapsulates the technical details that support the core business logic of the application, such as API communication, data storage, and other cross-cutting concerns. This approach makes the application more maintainable and adaptable to changes in external services or technical requirements.

- `http`: Axios-based abstraction layer for HTTP requests, encapsulating configurations and standardizing API calls.
- `socket`: Socket.io abstraction layer for handling WebSocket requests and encapsulating configurations

#### `src/pages`

Pages of the application (`/energy-deals` and `/energy-deals/new`), organizing views and associated logic.

#### `src/routes`

- `AppRoutes`: Configures React Router DOM for application navigation.
- `routes.ts`: Defines public/protected routes, aiming to consistent navigation and UI components like navbars.

#### `src/services`

Serves as a bridge between the application's core functionality and external data sources or APIs. It encapsulates the logic for making API calls and potentially transforming the data before passing it to the consuming parts of the application.

- `api`: Contains classes that define methods for interacting with external APIs. These methods use the HTTP abstraction provided by the infrastructure layer to make requests, ensuring that all API interactions are centralized and consistent.

#### `src/shared`

Utilities, contexts, and hooks shared throughout the app:

- `contexts`: Global state management (e.g., `EnergyOfferingContext` context).
- `hooks`: Custom hooks for abstracting logic and state management.
- `utils`: Utility functions for generic, reusable logic.

#### `src/styles`

Manages global styles classes recognized by Tailwindcss. Not really necessary as we can just use tailwind classes inside our components. However, it was implemented as a way to show a more readable approach for css classes.

## Caveats and Assumptions

### Backend

The backend is designed with a focus on being frontend oriented (like a BFF). For the sake of simplicity, it does not have any tests and might not be ideal for production code. However, it is beneficial as I avoided mocking all calls and responses in the frontend side. As a result, the frontend app is closer to a real world app.

### Frontend

Due to a possible lack of business context, the application flow or information might not be 100% accurate. No map our chart library was used given I assumed all fields could've been pure text, but it wouldn't be difficult to extend the `DynamicForm` and `FieldRenderers` components.
The energy offering table is showing all energy types and because of this reason, the only fields in the table are the common ones among all energy types. Another possible approach would be to show specific tables given a selected energy type.

For the status update, I'm assuming all of them will be `ACCEPTED` after 1.5 secs. Again, this behavior is handled by the backend and is only for demonstration purposes. In addition, the initial data in the database has an offering with `PROCESSING` status. There's nothing we can do in the FE side to change it as I assumed it should be an async job running in the backend and this offering is there only for demonstration purposes too.

## Testing

### Infrastructure

The project uses Vitest and testing-library for unit tests. All components, hooks, and functions have been tested.

#### `src/test-utils.tsx`

Custom render functions for wrapping components in necessary context providers for testing, simplifying setup and reducing boilerplate.

### Strategy

The strategy focuses on ensuring reliability and maintainability of the codebase through isolated unit tests, and leveraging modern tooling for mocking external dependencies.

#### Mocking External Interactions

- `MSW (Mock Service Worker)` Utilized for mocking API requests during testing, allowing components that make network requests to be tested in isolation without relying on actual backend services.

#### Unit Testing

All application layers have been tested. There are tests focusing more on individual components and functions (`utils`, `services`, some `components`) and tests that focus on the interaction between components or between components and the application's state management (contexts/hooks). This ensures that the application behaves correctly as a whole (tests in `pages`).

## Future Work Improvements

### Testing

Incorporate `integration` and `E2E` tests to the solution would make it even more reliable and easier to catch possible bugs. While unit tests are essential for verifying the functionality of individual pieces of code, they don't capture how those pieces work together or mimic the user's experience. That's where integration tests and end-to-end (E2E) tests come in, playing critical roles in ensuring the reliability, functionality, and user-friendliness of your application.

### Components

Although the components aims to be simple and scalable, the may not be able to serve all use cases and may need more generic behavior and/or extendable configuration as the project grows. In the same way as styling, some components or parts of them could be better abstracted in order to have better reuse of code.
Depending on project needs and company setup, another component library could've been used instead of `headlessui` library.

### Styling

Although Tailwindcss comes with lots of advantages such as being `utility-first approach`, `easy customization and configuration`, `performance`, among others, it also brings important considerations, such as `learning curve`, `verbose classnames`, `overring styles` might be tricky sometimes, `design consistency` specially when using arbitrary values (e.g., `w-[123px]`).
