import React, { useEffect, useState } from 'react'
import * as faceapi from 'face-api.js'
import './FaceTracking.css'
import img from '../image/로고.png'

function FaceTracking(props) {
  
  const [top, setTop] = useState()
  const [left, setLeft] = useState()
  const [height, setHeight] = useState()

  const run = async () => {
    console.log("run 시작")
    try {
      await faceapi.nets.tinyFaceDetector.load('/models/')
      await faceapi.nets.faceLandmark68Net.load('/models/')
      await faceapi.nets.faceRecognitionNet.load('/models/')
      await faceapi.nets.faceExpressionNet.load('/models/')
      await videoPlay()
    } catch(error) {
      console.log(error.name)
    }
  }

  const videoPlay = async () => {
    if (
      props.videoRef.current.paused ||
      props.videoRef.current.ended ||
      !faceapi.nets.tinyFaceDetector.params
    ) {
      setTimeout(() => videoPlay())
      return
    }

    const detections = await faceapi.detectAllFaces(props.videoRef.current, 
      new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

    const w = detections[0] ? detections[0].detection.box.width * 2 : 0
    const h = detections[0] ? detections[0].detection.box.height * 2 : 0
    detections[0] && await setHeight(detections[0].detection.box.height * 2)
    detections[0] && await setTop(detections[0].detection.box.top * 2 - h / 2)
    detections[0] && await setLeft((detections[0].detection.box.left + detections[0].detection.box.width / 2) * 2.5 - w / 2)

    setTimeout(() => videoPlay(), 100)

  } 

  useEffect(() => {
    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <img alt="이미지" src={img} style={{position: 'absolute', borderRadius: '50%', top: top, left: left, width: height, height: height}}/>
  )
}

export default FaceTracking