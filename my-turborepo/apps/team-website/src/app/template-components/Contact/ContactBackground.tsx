import Image from "next/image";
import "../../../styles/ContactBackground.css";

const ContactBackground = () => {

  return (
    <div className="max-w-[1440px] float-none mx-auto mt-[40px] mb-[40px]">
      <div className="large-layout-container">
        <div id="mod_d096fbc1_1" className="relative bg-center">
          <Image src="/images/contact/food.JPG" className="image-cell object-cover" width={500} height={500} alt="Image 1" />
        </div>
        <div id="mod_d096fbc1_2" className="relative bg-center">
          <Image src="/images/contact/prizes.JPG" className="image-cell object-cover" alt="Image 2" width={500} height={500} />
        </div>
        <div id="mod_d096fbc1_3" className="relative bg-center">
          <Image src="/images/contact/capital_one.JPG" className="image-cell object-cover" alt="Image 3" width={500} height={500} />
        </div>
        <div id="mod_d096fbc1_4" className="relative bg-center">
          <Image src="/images/contact/team_bond.JPG" className="image-cell object-cover" alt="Image 4" width={500} height={500} />
        </div>
        <div id="mod_d096fbc1_5" className="relative bg-center">
          <Image src="/images/contact/wide_room.JPG" className="image-cell object-cover" alt="Image 5" width={500} height={500} />
        </div>
        <div id="mod_d096fbc1_6" className="relative bg-center">
          <Image src="/images/contact/stickers.JPG" className="image-cell object-cover" alt="Image 6" width={500} height={500} />
        </div>
        <div id="mod_d096fbc1_7" className="relative bg-center">
          <Image src="/images/contact/chill.JPG" className="image-cell object-cover" alt="Image 7" width={500} height={500} />
        </div>
        <div id="mod_d096fbc1_8" className="relative bg-center">
          <Image src="/images/contact/snacks.JPG" className="image-cell object-cover" alt="Image 8" width={500} height={500} />
        </div>
      </div>
    </div>);
};

export default ContactBackground;