import SockJs from 'sockjs-client'
import StompJs from 'stompjs'

const sock = new SockJs("서버주소")
const stomp = StompJs.over(sock)
const jwt = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }

function StompConnect() {
  try {
    stomp.debug = null
    // console에서 웹소켓이 연결되었다는 로그가 출력되는 것을 막기 위함
    stomp.connect(jwt, () => {
      stomp.subscribe("서버주소", (data) => {
        const consultingData = JSON.parse(data)
        console.log(consultingData)
      }, jwt)
    })
  } catch {

  }
}

function StompDisConnect() {
  try {
    stomp.debug = null
    stomp.disconnect(() => {
      stomp.unsubscribe("sub-0")
    })
  } catch {

  }
}

function SendMessage(consultingData) {
  console.log(consultingData, JSON.stringify(consultingData))
  stomp.debug = null
  stomp.send("보낼 주소", jwt, JSON.stringify(consultingData))
}

export { StompConnect, StompDisConnect, SendMessage }