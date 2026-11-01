import { describe, it, expect } from 'vitest';

describe('PeopleDesk Application', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should verify the application name', () => {
    const appName = 'PeopleDesk';
    expect(appName).toBe('PeopleDesk');
  });

  it('should verify employee data', () => {
    const employee = {
      name: 'John',
      department: 'IT',
      salary: 30000
    };

    expect(employee.name).toBe('John');
    expect(employee.department).toBe('IT');
    expect(employee.salary).toBeGreaterThan(0);
  });
});