/* eslint-disable */
export default {
  // BASE_URL: 'http://localhost:8081/',
  BASE_URL: 'http://localhost:8080/',

  ROUTES: {
    // Account
    login: 'api/v1/restAuth/login/',
    signup: 'api/v1/restAuth/signup/',
    logout: 'api/v1/restAuth/loginrestAuth/logout/',
    password: 'api/v1/restAuth/loginrestAuth/password/',
    eamailConfirm: 'api/v1/myPage/',
    mypage: 'api/v1/myPage',
    myChatRoom: 'api/v1/myPage/rooms/',
    userChatroom: 'userChatrooms/',
    userChat: 'userChat/',
    tag: 'api/v1/myPage/tags',
    consultRequest: 'consultRequest',
    webChat: 'webChat',
    changeActive: 'api/v1/myPage/possible',
    // createPetInformation(Petpage)
    Petpage: 'petPage/pets/',
    // spendingOfMonth
    Expenditure: 'spendingOfMonth/expenditures/',
    Calendar: 'calendar/',
    userPhoto: 'api/v1/myPage/user_photo'
  },
};
