import React from 'react'

const seconds_60 = 60


const TestTimer = () => {
  // const initTimer = seconds_60 =>  {
  //   let end = Date.now() + seconds_60 * 1000
  // }

  // let x = window.setInterval(() => {
  //   let timeLeft = Math.floor((end - Date.now()) / 1000)

  //   if(timeLeft < 0) { clearInterval(x) }
    
  //   console.log(`00.${timeLeft < 10  ? 0 + timeLeft : timeLeft})`)
  // }200)

  // console.log(Date.now() + seconds_60 * 1000 )

  const end = Date.now() +  seconds_60 * 1000
  
  const x = window.setInterval(() => {
    let timeLeft = Math.floor((end - Date.now()) / 1000)
    console.log(timeLeft)
    if(timeLeft <= 0) { clearInterval(x) }

  }, 1000)
  console.log(end)

  return <div>
    {/* 00.{timeLeft < 10  ? 0 + timeLeft : timeLeft} */}
  </div>
}
export default TestTimer