class DashboardPage {
    VerifyOnDashboard() {
        cy.url().should('include', '/dashboard');
    }

    DashboardVisible() {
        cy.contains('Dashboard').should('be.visible');
    }

    dashboardHeader() {
        cy.contains('Dashboard');
    }

    ClickQuickLaunchButton(title) {
        return cy.get(`button[title="${title}"]`).should('be.visible').click();
    }

    // clickQuickLaunch(title) {
    //     this.ClickQuickLaunchButton(title);
    // }

    timeAtWorkWidget() {
        return cy.contains('Time at Work').should('be.visible');
    }

    myActionsWidget() {
        cy.contains('My Actions')
          .parents('.oxd-grid-item')
          .within(() => {
          cy.get('.orangehrm-todo-list').should('have.length.greaterThan', 0)
        });
    }

    myActionsList() {
        return this.myActionsWidget().parents('.oxd-grid-item').find('.orangehrm-todo-list');
    }

    buzzLatestPosts() {
        return cy.contains('Buzz Latest Posts').should('be.visible');
    }

    
}export default new DashboardPage();