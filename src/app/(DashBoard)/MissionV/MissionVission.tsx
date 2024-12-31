import Image from "next/image";
import Logo from "../../../assets/logo2.svg"

interface MissionvProps {
    Missiontext: string;
    Vissiontext: string;
}
const MissionV: React.FC<MissionvProps> = ({Missiontext, Vissiontext}) => {
    return(
        <section className="flex flex-col items-center p-8 bg-white mb-10">

      <h2 className="md:text-4xl text-2xl font-bold text-center mb-10 p-8">Mission and Vision</h2>

      <div className="flex flex-col md:flex-row items-center gap-8">
        
        <div className="text-center md:text-left bg-white p-4 border-2 border-gray-200 rounded-lg max-w-xs md:max-w-sm  transform transition duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
          <p className="text-sm">
            {/* Our mission is to be a global leader in language education, inspiring lifelong learning and cultural
            appreciation. We empower individuals to become confident multilingual communicators through innovative
            online platforms, equipping them to thrive in a connected world. */}
            {Missiontext}
          </p>
        </div>

        <div className="relative flex items-center justify-center w-32 h-32 md:w-48 md:h-48  transition-transform duration-500 hover:rotate-180">
          <div
            className="absolute w-full h-full rounded-full border-[20px] md:border-[35px] transition-all duration-500 ease-in-out"
            style={{
              borderColor: '#1F9F90 #F5A826 #F5A826 #1F9F90', // Half blue, half yellow
            }}
          ></div>

          <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center transition-transform duration-500 hover:scale-110">
            <Image
              src={Logo}
              alt="Center Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        </div>

        <div className="text-center md:text-left bg-white p-4 border-2 border-gray-200 rounded-lg max-w-xs md:max-w-sm  transform transition duration-300 hover:scale-105 hover:shadow-lg">
          <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
          <p className="text-sm">
            {/* We envision accessible, engaging language learning for all through advanced technology and expert
            instruction. By blending language with cultural immersion and personalized support, we foster a global
            community. Our goal is to redefine language education and unlock student potential. */}
            {Vissiontext}
          </p>
        </div>
      </div>
    </section>
    );
}

export default MissionV;