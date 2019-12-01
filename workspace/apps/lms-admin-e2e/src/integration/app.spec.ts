import { getGreeting } from '../support/app.po';

describe('lms-admin', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to lms-admin!');
  });
});
