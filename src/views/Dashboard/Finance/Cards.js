import React from 'react'
import './Card.css'
import { useDispatch, useSelector } from "react-redux"
import Typical from 'react-typical'
const Cards = () => {

  const { currentTheme, colors } = useSelector((state) => state.theme)

    const items = [
        {
            id: 1,
            name: 'Hacktoberfest 2021',
            date: 'Entire month',
            data: "Hacktober fest, in its 8th year, is a month-long celebration of open source software run by DigitalOcean. Join open-source software enthusiasts, beginners, and the developer community by contributing to open-source projects.Open-source projects keep the internet humming — but they can't do it without resources.Donate and support their awesome work."
        },
        {
            id: 2,
            name: 'Myntra HackerRamp',
            date: '3rd October ,2021',
            data: "Myntra HackerRamp is an opportunity for budding engineers all over India to unleash their creative selves and bring their ideas to life. This contest provides you with a forum to not only ideate but implement a functional working prototype with expert mentoring from engineering leaders at Myntra.Students must register in teams of 2 to 4 members."
        },
        {
            id: 3,
            name: "NASA's International space Apps",
            date: '3rd October ,2021',
            data: "The grandest space and science hackathon in the solar system! Make creative solutions to real-world difficulties utilizing current data from space.From its origination in 2012, NASA's International Space Apps Challenge has engaged 150,000+ people from 150+ countries in using NASA's open data to create progressive resolutions to situations we face on Earth and in space "
        },
        {
            id: 4,
            name: 'Web Weaver : IIT tech fest',
            date: '17th October,2022',
            data: 'Design a multi-page website for the hotel chain and get to learn various aspects of designing and linking web pages using HTML and CSS along the way.A detailed plan needs to be submitted for building the site, including infrastructure specifications. Teams will be shortlisted on the basis of their Plan.'
        },
        {
            id: 5,
            name: 'Hack-O-Heist NIT Patna',
            date: '15th October',
            data: 'Robotics Club NITP is organizing a thrilling event, a hackthon Hack-O-Heist. Ready to take this challenge of 36-hours of hacking? Look upon the themes, come up with hardware or software-based solutions, and showcase your innovation skills.'

        },
        {
            id: 6,
            name: 'Hacktoberfesty',
            date: 'Entire month',
            data: 'A detailed plan needs to be submitted for building the site, including infrastructure specifications. Teams will be shortlisted on the basis of their Plan. '
        },

    ]

    return (
        <div> <div className="cardings">
            {

                items.map((item) => (
                    <div data-aos="fade-left" className={` carding main-task-background ${currentTheme
                        ? colors.bg[currentTheme].dark
                        : "bg-purple-800"}`} key={item.id}>
                        <div className={` carding-inner main-task-background ${currentTheme
                        ? colors.bg[currentTheme].dark
                        : "bg-purple-800"}`} >
                            <div className={`carding-front main-task-background ${currentTheme
                        ? colors.bg[currentTheme].dark
                        : "bg-purple-800"}`} >
                                <h1>{item.name}</h1>
                            </div>
                            <div className={`carding-back main-task-background ${currentTheme
                        ? colors.bg[currentTheme].dark
                        : "bg-purple-800"}`}>
                                <h6>{item.data}</h6>
                            </div>
                        </div>
                    </div>
                ))

            })

        </div></div>
    )
}

export default Cards