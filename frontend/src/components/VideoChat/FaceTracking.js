import React, { useRef, useState } from 'react'
import * as faceapi from 'face-api.js'
import './FaceTracking.css'
import img from '../image/로고.png'

function FaceTracking() {
  const videoRef = useRef()
  const canvasRef = useRef()

  const [top, setTop] = useState()
  const [left, setLeft] = useState()
  const [height, setHeight] = useState()
  const [toggle, setToggle] = useState(false)

  function Toggle() {
    setToggle(!toggle)
  }

  function play() {
    run()
  }

  function close() {
    window.location.href = "/faceTest"
  }

  const run = async () => {
    console.log("run 시작")
    try {
      await faceapi.nets.tinyFaceDetector.load('/models/')
      await faceapi.nets.faceLandmark68Net.load('/models/')
      await faceapi.nets.faceRecognitionNet.load('/models/')
      await faceapi.nets.faceExpressionNet.load('/models/')
      const stream = await navigator.mediaDevices.getUserMedia({video: {facingMode: "user"}})
      videoRef.current.srcObject = stream
    } catch(error) {
      console.log(error.name)
    }
  }

  const videoPlay = async () => {
    if (
      videoRef.current.paused ||
      videoRef.current.ended ||
      !faceapi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => videoPlay())
      return
    }

    const detections = await faceapi.detectAllFaces(videoRef.current, 
      new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

    const w = detections[0] ? detections[0].detection.box.width * 2 : 0
    const h = detections[0] ? detections[0].detection.box.height * 2 : 0
    detections[0] && await setHeight(detections[0].detection.box.height * 2)
    detections[0] && await setTop(detections[0].detection.box.top * 1.7 - h / 2)
    detections[0] && await setLeft((detections[0].detection.box.left + detections[0].detection.box.width / 2) * 1.5 - w / 2)

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current)
    faceapi.matchDimensions(canvasRef.current, {
      width: 940,
      height: 650,
    })

    setTimeout(() => videoPlay(), 100)

  } 

  return(
    <div>
      <div className="Face">
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={videoPlay}
          style={{width: 940, height: 650}}
        />
        <canvas className={toggle ? "Emoji-on" : "Emoji-off"} ref={canvasRef} />
        <div className="Face-container">
          <img alt="이미지" src={img} className={toggle ? "Emoji-on" : "Emoji-off"} style={{top: top, left: left, width: height, height: height}}/>
        </div>
      </div>
      <button onClick={play}>시작</button>
      <button onClick={close}>멈춤</button>
      <button onClick={Toggle}>이모지/얼굴</button>
    </div>
  )
}

export default FaceTracking