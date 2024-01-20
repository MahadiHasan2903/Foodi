"use client";
import React from "react";
import {
  RiLinkedinFill,
  RiGithubFill,
  RiFacebookFill,
  RiInstagramFill,
} from "react-icons/ri";

const icons = [
  { path: "https://www.linkedin.com/in/mahadi2903", name: <RiLinkedinFill /> },
  { path: "https://github.com/MahadiHasan2903", name: <RiGithubFill /> },
  {
    path: "https://www.facebook.com/profile.php?id=100064028100652&mibextid=ZbWKwL",
    name: <RiFacebookFill />,
  },
  {
    path: "https://instagram.com/mahadi_hasan2903?igshid=NGExMmI2YTkyZg==",
    name: <RiInstagramFill />,
  },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {icons.map((icon, index) => (
        <a
          key={index}
          href={icon.path}
          target="_blank"
          rel="noopener noreferrer"
          className={iconStyles}
        >
          {icon.name}
        </a>
      ))}
    </div>
  );
};

export default Socials;
