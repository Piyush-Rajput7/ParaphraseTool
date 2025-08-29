import React from "react";
import { Heart, Github, Linkedin, Mail } from "lucide-react";

/**
 * Footer Component
 * Displays developer information, social links, tech stack, and copyright
 * Features: CSS animations, hover effects, and professional links
 * Author: Piyush Patil
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Tech stack used in the project
  const techStack = ["React.js", "Tailwind CSS", "Vite", "CSS Animations"];

  // Social media and contact links
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Piyush-Rajput7",
      label: "GitHub",
      color: "hover:text-gray-300",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/piyush-patil-7a2a261b9/",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      href: "mailto:piyushrajput710@gmail.com",
      label: "Email",
      color: "hover:text-green-400",
    },
  ];

  return (
    <footer className="mt-20 py-12 border-t border-white/10 animate-fade-in-up">
      {/* Main container with responsive padding */}
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          {/* Main Footer Content - Glass card with hover effects */}
          <div className="glass-card p-8 max-w-2xl mx-auto transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="space-y-4">
              {/* Developer attribution section */}
              <div className="flex items-center justify-center gap-1 text-lg animate-fade-in">
                <span className="font-bold text-white/80">Built By:</span>
                {/* Animated heart icon using CSS animations */}
                <div className="animate-pulse">
                 
                </div>
                
                {/* Developer name with portfolio link */}
                <a
                  href="https://piyushrajput-portfolio.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-white/80  transition-all duration-300 hover:scale-110"
                >
                  Piyush Patil
                </a>
              </div>

              {/* Assignment information */}
              <p className="text-white/60 animate-fade-in">
                for Anslation Internship Assignment
              </p>

              {/* Tech Stack Display */}
              <div className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in">
                {techStack.map((tech, index) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/70 border border-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/20 hover:-translate-y-1 hover:shadow-lg"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex justify-center gap-4 mt-6 animate-fade-in">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all duration-300 hover:scale-125 hover:-translate-y-1 hover:shadow-lg ${color}`}
                    aria-label={label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center text-white/50 text-sm animate-fade-in">
            <p>© {currentYear} ParaPhrase Tool. Crafted for excellence.</p>
          
          </div>

          {/* Decorative animated dots */}
          <div className="relative">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
                style={{
                  left: `${20 + i * 15}%`,
                  top: "50%",
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
