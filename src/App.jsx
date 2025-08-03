import React from "react"
import Layout from "./Layout";
import TaskCard from "./components/Task/TaskCard";
import Meme from "./components/Meme";
import Weather from "./components/Weather";
import RoutineCard from "./components/Routine/RoutineCard";
import Quote from "./components/Quote";
import Reminder from "./components/Reminder";
import MyWave from "./components/MyWave";

function App() {

  return (
    <>
      <Layout>
        <section className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 lg:grid-row-2 gap-6 mb-8">
          <TaskCard additionalClass={'lg:row-span-2'} />
          <Meme additionalClass={'order-first sm:order-none lg:row-span-2'} />
          <Weather />
          <RoutineCard />
        </section>
        <section className="flex flex-col sm:grid sm:grid-cols-2 sm:grid-rows-1 gap-6">
          <Quote />
          <Reminder />
        </section>
      </Layout>
      <div aria-hidden='true' className='absolute z-0 bottom-0 left-0 right-0'>
        <MyWave />
      </div>
    </>
  )
}

export default App
