/* eslint-disable */
export default {
  BASE_URL: 'http://localhost:8080/api/v1/',
  // BASE_URL: 'https://memorytraining.cf/api/',

  ROUTES: {
    // Account
    login: 'restAuth/login/',
    signup: 'restAuth/signup/',
    logout: 'restAuth/logout/',
    password: 'restAuth/password/',
    // Set
    create: 'books/create/',
    update: 'books/',
    delete: 'books/',
    search: 'books/search/',
    myset: 'books/myset/',
    getEntireCards: 'books/',
    getEntireQuizs: 'quizs/',
    scrap: 'books/scrap/',
    unscrap: 'books/scrap/',
    bookmark: 'books/bookmark/',
    unbookmark: 'books/bookmark/',
    deleteCard: 'books/card/',
    updateCard: 'books/card/',
    createCard: 'books/card/',

    // createPetInformation(Petpage)
    createPet: 'petPage/pets/',
  },
};
