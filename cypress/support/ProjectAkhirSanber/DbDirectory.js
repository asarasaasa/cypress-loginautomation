class DirectoryPage {


    goToDirectory() {
        cy.contains('a.oxd-main-menu-item', 'Directory')
          .should('be.visible')
          .click()
        cy.url().should('include', '/directory')
    }

  
    employeeSearchInput() {
        return cy.get('input[placeholder="Type for hints..."]');
    }

    jobTitleDropdown() {
        return cy.get('.oxd-select-text').eq(0);
    }

    locationDropdown() {
        return cy.get('.oxd-select-text').eq(1);
    }

    searchButton() {
        return cy.contains('button', 'Search');
    }

    resetButton() {
        return cy.contains('button', 'Reset');
    }


    autocompleteOptions() {
        return cy.get('.oxd-autocomplete-option');
    }


    selectJobTitle(title) {
        this.jobTitleDropdown().click();
        cy.get('.oxd-select-dropdown').eq(0).contains(title).click();
    }

    selectLocation(location) {
        cy.get('.oxd-select-text').eq(1).click()
        cy.contains(location).click()
    }

    typeEmployee(name) {
        this.employeeSearchInput().clear().type(name);
    }

    clickSearch() {
        this.searchButton().click();
    }

    clickReset() {
        this.resetButton().click();
    }

    selectEmployeeFromSuggestion(name) {
        cy.contains('.oxd-autocomplete-option', name)
          .should('be.visible')
          .and('contain', name)
          .click();
    }

    
    validateEmployeeInList(name) {
        cy.contains(name).should('exist');
    }

    validateJobTitleInList(title) {
        cy.contains(title).should('exist');
    }

    validateLocationInList(location) {
        cy.contains(location).should('exist');
    }

    validateAutocompleteNotExist(name) {
        cy.contains('.oxd-autocomplete-option', name).should('not.exist');
    }

    validateInputValue(value) {
        this.employeeSearchInput().should('have.value', value);
    }

    validateErrorMessage(message) {
        cy.get('.oxd-input-field-error-message')
          .should('be.visible')
          .and('contain', message);
    }

}

export default new DirectoryPage();