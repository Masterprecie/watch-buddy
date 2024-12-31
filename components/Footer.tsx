import Link from "next/link";
import { FaFacebook, FaLinkedin, FaXTwitter, FaGithub } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="w-[90%] mx-auto flex flex-col py-5 items-center">
        <div>
          <div className="flex items-center justify-center gap-5">
            <Link
              href="https://web.facebook.com/profile.php?id=100095140166232"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </Link>
            <Link
              href="https://x.com/IkpaPrecious2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </Link>
            <Link
              href="https://github.com/Masterprecie?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ikpa-precious-475675166/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
          </div>
          <div className="flex items-center gap-10 font-medium text-sm py-5">
            <p>Conditions of Use</p>
            <p>Privacy & Policy</p>
          </div>
          <div className="text-sm font-medium">
            © 2025 WatchBuddy by{""}
            <Link
              href="https://devprecie.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 pl-2"
            >
              Dev_Presh
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
