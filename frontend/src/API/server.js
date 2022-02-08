/* eslint-disable */
export default {
  BASE_URL: 'http://localhost:8080/',
  // BASE_URL: 'http://i6b109.p.ssafy.io/',

  ROUTES: {
    // Account
    login: 'api/v1/restAuth/login/',
    signup: 'api/v1/restAuth/signup/',
    logout: 'api/v1/restAuth/loginrestAuth/logout/',
    password: 'api/v1/restAuth/loginrestAuth/password/',
    eamailConfirm: 'api/v1/myPage/',
    mypage: 'api/v1/myPage',
    chatroom: 'userChatrooms/',
    chat: '/userChat/',
    // createPetInformation(Petpage)
    createPet: 'petPage/pets/',
    // spendingOfMonth
    Expenditure: 'spendingOfMonth/expenditures',
    TotalPrice: 'spendingOfMonth/totalAmountOfPayment'
  },
};
