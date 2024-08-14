## 1. Code Guidelines

### 1.1 Abstracting logic
 _why:_

 > Abstracting logic helps in organizing code, promoting reusability, and improving maintainability by separating business logic from UI components.

**Use JavaScript Classes:**

- When you want to encapsulate complex business logic that may not be directly related to the UI.
- When you need to create multiple instances of the logic with different states.
- When you prefer an object-oriented approach to managing state and behavior.

**Use React Hooks:**

- When you want to keep all the logic related to a specific piece of state or side effects within the functional components.
- When you need to leverage the simplicity and reusability of hooks.
- When you are working within the context of a React application and want to stay consistent with functional component patterns.
