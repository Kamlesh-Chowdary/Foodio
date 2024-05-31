import { Facebook, Instagram, Twitter, Copyright } from "lucide-react";
import { Container, Logo } from "../index";
import { Link } from "react-router-dom";
const Footer = () => {
  const navItems = [
    {
      name: "Home",
      path: "",
    },
    {
      name: "Menu",
      path: "menu",
    },
    {
      name: "Order online",
      path: "order",
    },
    {
      name: "Reservation",
      path: "reservation",
    },
    {
      name: "Contact us",
      path: "contact",
    },
  ];
  return (
    <>
      <footer>
        <Container>
          <div>
            <div>
              <Logo />
            </div>
            <div>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestiae earum hic cumque est, eveniet ipsa dicta reprehenderit,
              incidunt molestias veniam dolorum inventore exercitationem sunt
              magni, nam fugit. Iure, distinctio amet!
            </div>
            <div>
              <Twitter />
              <Instagram />
              <Facebook />
            </div>
          </div>
          <div>
            <h1>Page</h1>
            <ul>
              {navItems.map((item) => {
                return (
                  <Link to={item.path} key={item.name}>
                    <li>{item.name}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div>
            <h1>Information</h1>
            <ul>
              <Link to="about" key="About us">
                <li>About us</li>
              </Link>
              <li>Testimonial</li>
              <li>Event</li>
            </ul>
          </div>
          <div>
            <h1>Get In Touch</h1>
            <ul>
              <li>2972 Westheimer Rd. Santa Ana, Illinois 85486</li>
              <li>abc@example.com</li>
              <li>+123 4567 8901</li>
            </ul>
          </div>
          <p>
            Copyright <Copyright /> 2024
          </p>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
