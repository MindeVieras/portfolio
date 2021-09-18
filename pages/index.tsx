import type { NextPage } from 'next'

import dynamic from 'next/dynamic'

// Render pizza at the frontend level.
const Pizza = dynamic(
  () => import('../components/Pizza'),
  { ssr: false }
)

const Home: NextPage = () => <Pizza
  // size={{ width: 1000, height: 500 }}
  // center={{ x: 400, y: 200 }}
  centerPiece={{
    title: 'Minde Vieras',
    image: '/images/logo.png',
    textTop: 'Full Stack Developer',
    textBottom: 'Minde Vieras'
  }}
  pieces={[
    {
      text: 'Summary',
      fill: 'red'
    },
    {
      text: 'Projects',
      fill: 'green'
    },
    {
      text: 'Experience',
      fill: 'blue'
    },
    {
      text: 'Expertise',
      fill: 'orange'
    },
    {
      text: 'Education',
      fill: 'pink'
    },
    {
      text: 'Interests',
      fill: 'brown'
    },
    {
      text: 'Interests',
      fill: 'violet'
    },
    {
      text: 'Interests',
      fill: 'yellow'
    },
    {
      text: 'Interests',
      fill: 'gray'
    },
    {
      text: 'Interests',
      fill: 'tomato'
    },
    {
      text: 'Interests',
      fill: 'DodgerBlue'
    }
  ]}
/>

export default Home
