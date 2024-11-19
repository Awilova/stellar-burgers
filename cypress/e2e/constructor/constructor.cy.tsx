describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });
});

describe('проверяем конструктор ингредиентов', () => {
  const actions = {
    getBuns: 'Выберите булки',
    getMain: 'Выберите начинку',
    add: 'Добавить',
    getOrder: 'Оформить заказ'
  };

  const ingredientTypes = {
    buns: 'Булки',
    main: 'Начинки',
    sauces: 'Соусы'
  };

  const ingredientDetails = 'Детали ингредиента';

  before(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });
  });
  beforeEach('Авторизаций пользователя', () => {
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.setCookie('accessToken', 'mockedAccessToken');
    window.localStorage.setItem('refreshToken', 'mockedRefreshToken');
  });

  beforeEach('Открытие главной страницы', () => {
    cy.visit('/');
  });

  afterEach('Удаление куки', () => {
    cy.clearCookie('accessToken');
    window.localStorage.removeItem('refreshToken');
  });

  describe('Добавление ингредиентов в конструктор бургера', () => {
    it('Добавление булки', () => {
      cy.get('div').contains(actions.getBuns).should('exist');
      cy.get('h3')
        .contains(ingredientTypes.buns)
        .next('ul')
        .contains(actions.add)
        .click();
      cy.get('div').contains(actions.getBuns).should('not.exist');
    });

    it('Добавление начинки', () => {
      cy.get('div').contains(actions.getMain).should('exist');
      cy.get('h3')
        .contains(ingredientTypes.main)
        .next('ul')
        .contains(actions.add)
        .click();
      cy.get('div').contains(actions.getMain).should('not.exist');
    });

    it('Добавление соуса', () => {
      cy.get('div').contains(actions.getMain).should('exist');
      cy.get('h3')
        .contains(ingredientTypes.sauces)
        .next('ul')
        .contains(actions.add)
        .click();
      cy.get('div').contains(actions.getMain).should('not.exist');
    });
  });

  describe('Работа модальных окон', () => {
    beforeEach('Открытие модального окна ингридиента', () => {
      cy.contains('Кристаллы марсианских альфа-сахаридов').click();
    });

    it('Закрытие модального окна ингридиента по нажатию на esc', () => {
      cy.contains(ingredientDetails).should('exist');
      cy.get('body').type('{esc}');
      cy.contains(ingredientDetails).should('not.exist');
    });

    it('Закрытие модального окна ингридиента по нажатию на крестик', () => {
      cy.contains(ingredientDetails).should('exist');
      cy.get(`[data-cy='modal-close-icon']`).click();
      cy.contains(ingredientDetails).should('not.exist');
    });
  });

  describe('Сборка и оформление заказа', () => {
    it('Сборка и оформление заказа', () => {
      cy.contains('Anastasia').should('exist');
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      });

      cy.get('h3')
        .contains(ingredientTypes.buns)
        .next('ul')
        .contains(actions.add)
        .click();

      cy.get('h3')
        .contains(ingredientTypes.main)
        .next('ul')
        .contains(actions.add)
        .click();

      cy.get('h3')
        .contains(ingredientTypes.sauces)
        .next('ul')
        .contains(actions.add)
        .click();

      cy.contains(actions.getOrder).click();

      cy.contains('1').should('exist');

      cy.get(`[data-cy='modal-close-icon']`).click();
      cy.contains(ingredientDetails).should('not.exist');

      cy.get('div').contains(actions.getBuns).should('exist');
      cy.get('div').contains(actions.getMain).should('exist');
    });
  });
});
