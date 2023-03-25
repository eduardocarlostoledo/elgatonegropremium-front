import "../styles/About.css"
import AboutCard from "./AboutCard"
import Edu from "../images/Edu.png"

export default function About () {
    const integrantes = [
            {
            name:"Eduardo Carlos Toledo",
            image:<img src={Edu} className='profile_image'/>,
            linkedin:"https://www.linkedin.com/in/eduardo-toledo-639ab198/" ,
            github:"https://github.com/eduardocarlostoledo",
            portfolio:"",
            instagram:""},
        ]

    return (
        <div className="about_container">
            {integrantes.map((i) => {
                return (
                    <AboutCard 
                    name={i.name}
                    image={i.image}
                    linkedin={i.linkedin}
                    github={i.github}
                    portfolio={i.portfolio}
                    />
                )
            })}
        </div>
    )
}