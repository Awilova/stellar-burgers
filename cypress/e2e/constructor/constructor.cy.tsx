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

  beforeEach(() => {
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

  it('Добавление булки', () => {
    cy.get('div').contains(actions.getBuns).should('exist');
    cy.get('h3')
      .contains(ingredientTypes.buns)
      .next('ul')
      .contains(actions.add)
      .click();
    cy.get('[data-cy="constructor-buns"]')
      .first()
      .within(() => {
        cy.contains(`Флюоресцентная булка R2-D3 (верх)`).should('exist');
      });
    cy.get('[data-cy="constructor-buns"]')
      .last()
      .within(() => {
        cy.contains(`Флюоресцентная булка R2-D3 (низ)`).should('exist');
      });
  });

  it('Добавление соуса', () => {
    cy.get('div').contains(actions.getMain).should('exist');
    cy.get('h3')
      .contains(ingredientTypes.sauces)
      .next('ul')
      .contains(actions.add)
      .click();
    cy.get('[data-cy="constructor-main"]').within(() => {
      cy.get('[data-cy="i-643d69a5c3f7b9001cfa0942"]').should('exist');
    });
  });

  it('Добавление начинки', () => {
    cy.get('div').contains(actions.getMain).should('exist');
    cy.get('h3')
      .contains(ingredientTypes.main)
      .next('ul')
      .contains(actions.add)
      .click();
    cy.get('[data-cy="constructor-main"]').within(() => {
      cy.get('[data-cy="i-643d69a5c3f7b9001cfa0948"]').should('exist');
    });
  });

  it('Открытие/содержание модального окна и закрытие по крестику', () => {
    cy.contains('Кристаллы марсианских альфа-сахаридов').should('not.exist');
    cy.contains('Кристаллы марсианских альфа-сахаридов').click();
    cy.get(`[data-cy='modal']`).should('exist').should('be.visible');

    cy.get('[data-cy="i-643d69a5c3f7b9001cfa0948"]').within(() => {
      cy.get('h3').should(
        'contain.text',
        'Кристаллы марсианских альфа-сахаридов'
      );
      cy.contains('Калории, ккал').next().should('contain.text', '189');
      cy.contains('Белки, г').next().should('contain.text', '234');
      cy.contains('Жиры, г').next().should('contain.text', '432');
      cy.contains('Углеводы, г').next().should('contain.text', '111');
      cy.contains('762').should('not.exist');
      cy.get('img').should(
        'have.attr',
        'src',
        'https://code.s3.yandex.net/react/code/core-large.png'
      );
    });
    cy.get(`[data-cy='modal-close-icon']`).click();
    cy.contains(ingredientDetails).should('not.exist');
  });

  it('Открытие и закрытие модального окна по нажатию на esc', () => {
    cy.contains('Соус Spicy-X').should('not.exist');
    cy.contains('Соус Spicy-X').click();
    cy.get(`[data-cy='modal']`).should('exist').should('be.visible');
    cy.contains(ingredientDetails).should('exist');
    cy.get('body').type('{esc}');
    cy.contains(ingredientDetails).should('not.exist');
  });

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

    cy.contains('59843').should('exist');

    cy.get(`[data-cy='modal-close-icon']`).click();
    cy.contains(ingredientDetails).should('not.exist');

    cy.get('div').contains(actions.getBuns).should('exist');
    cy.get('div').contains(actions.getMain).should('exist');
  });
});
