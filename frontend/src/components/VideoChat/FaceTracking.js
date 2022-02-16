import React, { useEffect, useState } from 'react'
import * as faceapi from 'face-api.js'
import './FaceTracking.css'

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
      
      const resized = faceapi.resizeResults(detections, {
        width: props.videoRef.current.offsetWidth,
        height: props.videoRef.current.offsetHeight,
      })
      
    const w = resized[0] ? resized[0].detection.box.width : 0
    const h = resized[0] ? resized[0].detection.box.height : 0
    resized[0] && await setHeight(w > h ? w * 1.5 : h * 1.5)
    resized[0] && await setTop(resized[0].detection.box.top - (h / 2))
    resized[0] && await setLeft((resized[0].detection.box.left - (w * 2/5)) * 1.1)

    setTimeout(() => videoPlay(), 100)

  } 

  useEffect(() => {
    run()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
    <div className='faceFind'>
      {
        props.userPhoto !== ''
        ?
        <img alt="이미지" src={'data:image/png;base64,' + props.userPhoto} style={{  position: 'absolute', borderRadius: '50%', top: top, left: left, width: height, height: height}}/>
        :
        <img alt="이미지" src={process.env.PUBLIC_URL + '/image/logo.png'} style={{position: 'absolute', borderRadius: '50%', top: top, left: left, width: height, height: height}}/>
      }

    </div>
  )
}

export default FaceTracking