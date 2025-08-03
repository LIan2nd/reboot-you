import React from 'react'
import Wave from 'react-wavify'

const MyWave = () => {
  return (
    <Wave fill='url(#gradient)'
      paused={false}
      style={{ display: 'flex' }}
      options={{
        height: 0,
        amplitude: 10,
        speed: 0.30,
        points: 5
      }}
    >
      <defs>
        <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor="#69D2E7" />
          <stop offset="90%" stopColor="#148092" />
        </linearGradient>
      </defs>
    </Wave>
  )
}

export default MyWave