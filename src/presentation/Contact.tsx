import { LinkedinLogo, WhatsappLogo } from "@/assets/CustomLogo";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <footer id="contact" className="w-full h-full p-8">
        <h4 className="text-start text-xl font-semibold">Contact Me On :</h4>
        <ul className="flex flex-col gap-2 mt-4 ">
            <li>
              <Link className="flex gap-2 items-center" target="_blank" to={"https://www.linkedin.com/in/miko-aji-nurachman-653bb2201?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>
              <LinkedinLogo/>
                <small className="text-sm">Linkedin</small>
              </Link>
            </li>
            <li>
              <Link className="flex gap-2 items-center" target="_blank" to={"https://wa.me/6285156929678"}>
              <WhatsappLogo/>
                <small className="text-sm">Whatsapp</small>
              </Link>
            </li>
        </ul>
    </footer>
  )
}
