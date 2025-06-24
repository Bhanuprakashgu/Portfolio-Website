import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './App.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaDatabase, FaChartBar, FaBrain, FaLaptopCode, FaTools, FaUsers, FaRocket, FaStar, FaHeart } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin, MotionPathPlugin);

function App() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Enhanced loading animation with particles
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // Enhanced custom cursor with magnetic effect
      const cursor = cursorRef.current;
      const cursorDot = cursorDotRef.current;

      const moveCursor = (e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out"
        });
        gsap.to(cursorDot, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "power2.out"
        });
      };

      // Magnetic effect for interactive elements
      const magneticElements = document.querySelectorAll('.magnetic');
      magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          gsap.to(cursor, { scale: 2, duration: 0.3 });
        });
        element.addEventListener('mouseleave', () => {
          gsap.to(cursor, { scale: 1, duration: 0.3 });
        });
      });

      document.addEventListener('mousemove', moveCursor);

      // Enhanced hero animations with stagger and morphing
      const tl = gsap.timeline();
      
      tl.from('.hero-title .word', {
        y: 150,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.2,
        transformOrigin: "bottom"
      })
      .from('.hero-subtitle', {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-=0.6")
      .from('.hero-buttons .btn', {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1
      }, "-=0.4")
      .from('.hero-social a', {
        y: 30,
        opacity: 0,
        rotation: 180,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

      // Advanced floating elements with physics
      gsap.utils.toArray('.floating-element').forEach((element, index) => {
        gsap.to(element, {
          y: -30 - (index * 5),
          x: Math.sin(index) * 20,
          rotation: 360,
          duration: 4 + (index * 0.5),
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
          delay: index * 0.2
        });
      });

      // Parallax scrolling effect
      gsap.utils.toArray('.parallax').forEach((element) => {
        gsap.to(element, {
          yPercent: -50,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Enhanced scroll-triggered animations with morphing
      gsap.utils.toArray('.animate-on-scroll').forEach((element, index) => {
        gsap.fromTo(element, 
          {
            y: 120,
            opacity: 0,
            scale: 0.8,
            rotation: index % 2 === 0 ? -5 : 5
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Advanced skills animation with 3D effects
      gsap.utils.toArray('.skill-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            scale: 0.7,
            opacity: 0,
            rotationY: 90,
            z: -100
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            z: 0,
            duration: 1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.15
          }
        );

        // Hover animations
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            rotationY: 5,
            z: 50,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            rotationY: 0,
            z: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Enhanced project cards with liquid morphing
      gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.fromTo(card,
          {
            x: index % 2 === 0 ? -150 : 150,
            opacity: 0,
            rotation: index % 2 === 0 ? -10 : 10,
            scale: 0.8
          },
          {
            x: 0,
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            },
            delay: index * 0.2
          }
        );

        // Advanced hover effects
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.03,
            y: -10,
            boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out"
          });
        });
      });

      // Typewriter effect for dynamic text
      const typewriterText = document.querySelector('.typewriter-text');
      if (typewriterText) {
        const texts = ['Data Scientist', 'ML Developer', 'NLP Specialist', 'Data Analyst', 'Deep Learning Engineer'];
        let currentIndex = 0;
        
        const typeWriter = () => {
          gsap.to(typewriterText, {
            text: texts[currentIndex],
            duration: 2,
            ease: "none",
            onComplete: () => {
              setTimeout(() => {
                currentIndex = (currentIndex + 1) % texts.length;
                typeWriter();
              }, 2000);
            }
          });
        };
        
        setTimeout(typeWriter, 1000);
      }

      // Particle system
      const createParticles = () => {
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #00f5ff, #ff00ff);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
          `;
          document.body.appendChild(particle);
          
          gsap.set(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: Math.random() * 0.5 + 0.2
          });
          
          gsap.to(particle, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            duration: Math.random() * 10 + 5,
            ease: "none",
            repeat: -1,
            yoyo: true
          });
        }
      };

      createParticles();

      return () => {
        document.removeEventListener('mousemove', moveCursor);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, [loading]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <div className="logo-text">BP</div>
            <div className="logo-ring"></div>
            <div className="logo-particles">
              {[...Array(12)].map((_, i) => (
                <div key={i} className={`logo-particle particle-${i}`}></div>
              ))}
            </div>
          </div>
          <div className="loading-text">
            <span>Initializing</span>
            <span className="loading-dots">...</span>
          </div>
          <div className="loading-progress">
            <div className="loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-container">
      {/* Enhanced Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-ring"></div>
      </div>
      <div ref={cursorDotRef} className="custom-cursor-dot"></div>

      {/* Enhanced Floating Background Elements */}
      <div className="floating-elements">
        <div className="floating-element floating-1 parallax">
          <FaRocket />
        </div>
        <div className="floating-element floating-2 parallax">
          <FaStar />
        </div>
        <div className="floating-element floating-3 parallax">
          <FaHeart />
        </div>
        <div className="floating-element floating-4 parallax">
          <FaCode />
        </div>
        <div className="floating-element floating-5 parallax">
          <FaBrain />
        </div>
        <div className="floating-element floating-6 parallax">
          <FaDatabase />
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="navbar">
        <div className="nav-brand magnetic">
          <span className="brand-text">Guddeti Bhanu Prakash</span>
          <div className="brand-underline"></div>
        </div>
        <ul className="nav-menu">
          <li><a href="#home" className="magnetic">Home</a></li>
          <li><a href="#about" className="magnetic">About</a></li>
          <li><a href="#skills" className="magnetic">Skills</a></li>
          <li><a href="#projects" className="magnetic">Projects</a></li>
          <li><a href="#certificates" className="magnetic">Certificates</a></li>
          <li><a href="#experience" className="magnetic">Experience</a></li>
          <li><a href="#contact" className="magnetic">Contact</a></li>
        </ul>
      </nav>

      {/* Enhanced Hero Section */}
      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="word gradient-text">AI</span>
            <span className="word gradient-text">Engineer</span>
            <br />
            <div className="hero-role-container">
              <span className="role-separator">&</span>
              <span className="dynamic-role">
                <span className="typewriter-text">Data Scientist</span>
              </span>
            </div>
          </h1>
          <p className="hero-subtitle">
            Transforming complex data into intelligent solutions with cutting-edge AI and Machine Learning.
            Passionate about building systems that make a real-world impact through innovation and creativity.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary magnetic btn-large" onClick={scrollToContact}>
              <FaUsers className="btn-icon" />
              <span>Let's Collaborate</span>
              <div className="btn-ripple"></div>
            </button>
            <a href="https://drive.google.com/file/d/15YXsW-x9gGoHIHm7hCryylGArnBSye4a/view" target="_blank" rel="noopener noreferrer" className="btn btn-secondary magnetic btn-large">
              <FaEnvelope className="btn-icon" />
              <span>View Resume</span>
              <div className="btn-ripple"></div>
            </a>
          </div>
          <div className="hero-social">
            <a href="https://github.com/Bhanuprakashgu" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="magnetic">
              <FaGithub />
              <span className="social-tooltip">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/bhanu-prakash-guddeti-822a9522a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="magnetic">
              <FaLinkedin />
              <span className="social-tooltip">LinkedIn</span>
            </a>
            <a href="mailto:bhanuprakashguddeti@gmail.com" aria-label="Email" className="magnetic">
              <FaEnvelope />
              <span className="social-tooltip">Email</span>
            </a>
            <a href="https://leetcode.com/u/bhanuprakashguddeti/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" className="magnetic">
              <FaCode />
              <span className="social-tooltip">LeetCode (100+)</span>
            </a>
          </div>
        </div>
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="about-section animate-on-scroll">
        <div className="container">
          <h2 className="section-title">
            <span className="title-text">About Me</span>
            <div className="title-underline"></div>
          </h2>
          <div className="about-content">
            <div className="about-text">
              <p className="animate-on-scroll">
                I am a passionate and results-driven AI & Data Science professional with a strong foundation in machine learning, 
                deep learning, and data analysis. Recently graduated with a B.Tech in Artificial Intelligence & Data Science, 
                achieving a CGPA of 8.1/10.0.
              </p>
              <p className="animate-on-scroll">
                My expertise lies in transforming complex datasets into actionable insights and building intelligent systems 
                that solve real-world problems. I am proficient in Python, R, and SQL, with hands-on experience in TensorFlow, 
                Pandas, NumPy, and Scikit-learn.
              </p>
              <p className="animate-on-scroll">
                With over 100+ problems solved on LeetCode and expertise in advanced algorithms including Divide and Conquer, 
                Dynamic Programming, and Database optimization, I bring both theoretical knowledge and practical problem-solving skills.
              </p>
            </div>
            <div className="about-cards">
              <div className="info-card animate-on-scroll magnetic">
                <div className="card-icon">🎓</div>
                <h3>Education</h3>
                <p>B.Tech in AI & Data Science</p>
                <p>Guru Nanak Institutions Technical Campus</p>
                <p>CGPA: 8.1/10.0 (2021-2025)</p>
              </div>
              <div className="info-card animate-on-scroll magnetic">
                <div className="card-icon">📞</div>
                <h3>Contact</h3>
                <p>📧 bhanuprakashguddeti@gmail.com</p>
                <p>📱 +91 8096009638</p>
                <p>📍 Hyderabad, Telangana, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="skills-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="title-text">Technical Expertise</span>
            <div className="title-underline"></div>
          </h2>
          <div className="skills-grid">
            <div className="skill-card magnetic">
              <div className="skill-icon">
                <FaLaptopCode />
              </div>
              <h3>Programming Languages</h3>
              <div className="skill-tags">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">C/C++</span>
                <span className="skill-tag">R Programming</span>
                <span className="skill-tag">MySQL</span>
                <span className="skill-tag">JavaScript</span>
              </div>
              <div className="card-glow"></div>
            </div>
            
            <div className="skill-card magnetic">
              <div className="skill-icon">
                <FaChartBar />
              </div>
              <h3>Data Analysis & Visualization</h3>
              <div className="skill-tags">
                <span className="skill-tag">Tableau</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">Pandas</span>
                <span className="skill-tag">Matplotlib</span>
                <span className="skill-tag">Seaborn</span>
              </div>
              <div className="card-glow"></div>
            </div>
            
            <div className="skill-card magnetic">
              <div className="skill-icon">
                <FaBrain />
              </div>
              <h3>Machine Learning & AI</h3>
              <div className="skill-tags">
                <span className="skill-tag">TensorFlow</span>
                <span className="skill-tag">Scikit-learn</span>
                <span className="skill-tag">Deep Learning</span>
                <span className="skill-tag">NLP</span>
                <span className="skill-tag">Computer Vision</span>
              </div>
              <div className="card-glow"></div>
            </div>
            
            <div className="skill-card magnetic">
              <div className="skill-icon">
                <FaDatabase />
              </div>
              <h3>Database & Algorithms</h3>
              <div className="skill-tags">
                <span className="skill-tag">MySQL (50+ problems)</span>
                <span className="skill-tag">Dynamic Programming</span>
                <span className="skill-tag">Divide & Conquer</span>
                <span className="skill-tag">Hash Tables</span>
              </div>
              <div className="card-glow"></div>
            </div>
            
            <div className="skill-card magnetic">
              <div className="skill-icon">
                <FaTools />
              </div>
              <h3>Tools & Technologies</h3>
              <div className="skill-tags">
                <span className="skill-tag">Git/GitHub</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Jupyter</span>
                <span className="skill-tag">Flask</span>
                <span className="skill-tag">Streamlit</span>
              </div>
              <div className="card-glow"></div>
            </div>
            
            <div className="skill-card magnetic">
              <div className="skill-icon">
                <FaUsers />
              </div>
              <h3>Soft Skills</h3>
              <div className="skill-tags">
                <span className="skill-tag">Problem Solving</span>
                <span className="skill-tag">Team Collaboration</span>
                <span className="skill-tag">Communication</span>
                <span className="skill-tag">Analytics</span>
                <span className="skill-tag">Leadership</span>
              </div>
              <div className="card-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="title-text">Featured Projects</span>
            <div className="title-underline"></div>
          </h2>
          <div className="projects-grid">
            <div className="project-card magnetic">
              <div className="project-header">
                <h3>FinForecast - Stock Market Analyser</h3>
                <a href="https://github.com/Bhanuprakashgu/Stock-Market-Analyser" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub />
                </a>
              </div>
              <p>Comprehensive stock market analysis and prediction system using LSTM and Prophet models for forecasting stock prices and market trends with real-time data integration.</p>
              <div className="project-tech">
                <span className="tech-tag">Flask</span>
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">Prophet</span>
                <span className="tech-tag">LSTM</span>
              </div>
              <div className="project-glow"></div>
            </div>
            
            <div className="project-card magnetic">
              <div className="project-header">
                <h3>Movie Recommendation System</h3>
                <a href="https://github.com/Bhanuprakashgu/movie-recommendation" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub />
                </a>
              </div>
              <p>Personalized movie recommendation engine using collaborative and content-based filtering techniques with interactive Streamlit interface and advanced ML algorithms.</p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Streamlit</span>
                <span className="tech-tag">Pandas</span>
                <span className="tech-tag">Scikit-learn</span>
              </div>
              <div className="project-glow"></div>
            </div>
            
            <div className="project-card magnetic">
              <div className="project-header">
                <h3>Hate Speech Detection System</h3>
                <a href="https://github.com/Bhanuprakashgu/Hate-Speech-Detection" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub />
                </a>
              </div>
              <p>AI-powered system for identifying and classifying hate speech using BERT-based models and advanced NLP techniques with high accuracy and real-time processing.</p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">BERT</span>
                <span className="tech-tag">TensorFlow</span>
                <span className="tech-tag">NLP</span>
              </div>
              <div className="project-glow"></div>
            </div>
            
            <div className="project-card magnetic">
              <div className="project-header">
                <h3>Head Injury Prediction System</h3>
                <a href="https://github.com/Bhanuprakashgu/Head-Injury-Prediction-System" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub />
                </a>
              </div>
              <p>Medical AI system for predicting head injury severity using machine learning algorithms and medical imaging data to assist healthcare professionals in diagnosis.</p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Machine Learning</span>
                <span className="tech-tag">Medical AI</span>
                <span className="tech-tag">Data Analysis</span>
              </div>
              <div className="project-glow"></div>
            </div>
            
            <div className="project-card magnetic">
              <div className="project-header">
                <h3>Real-Time Facial Emotion Recognition</h3>
                <a href="https://github.com/Bhanuprakashgu/Real-Time-Facial-Emotion-Recognition-System" target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaGithub />
                </a>
              </div>
              <p>Advanced computer vision system for real-time emotion detection using deep learning and OpenCV with high accuracy facial recognition and emotion classification.</p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">OpenCV</span>
                <span className="tech-tag">Deep Learning</span>
                <span className="tech-tag">Computer Vision</span>
              </div>
              <div className="project-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Certificates Section */}
      <section id="certificates" className="certificates-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="title-text">Certifications & Achievements</span>
            <div className="title-underline"></div>
          </h2>
          <div className="certificates-grid">
            <div className="certificate-card magnetic">
              <div className="certificate-header">
                <div className="certificate-logo">
                  <img src="/logos/oracle.png" alt="Oracle" />
                </div>
                <h3>Oracle Database Certification</h3>
              </div>
              <p>Comprehensive certification in Oracle Database management, SQL optimization, and database administration with hands-on experience in enterprise-level database systems.</p>
              <div className="certificate-details">
                <span className="cert-issuer">Oracle Corporation</span>
                <span className="cert-year">2024</span>
              </div>
              <a href="https://drive.google.com/file/d/1ivnU0ONbIrgIxilUM66P7fYjnrSwQiTS/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="certificate-link magnetic">
                <span>View Certificate</span>
                <div className="link-arrow">→</div>
              </a>
              <div className="certificate-glow"></div>
            </div>
            
            <div className="certificate-card magnetic">
              <div className="certificate-header">
                <div className="certificate-logo">
                  <img src="/logos/data-science-lab.png" alt="Applied Data Science Lab" />
                </div>
                <h3>Applied Data Science Lab</h3>
              </div>
              <p>Advanced data science certification covering statistical modeling, machine learning algorithms, and real-world data analysis projects with practical applications.</p>
              <div className="certificate-details">
                <span className="cert-issuer">WorldQuant University</span>
                <span className="cert-year">2024</span>
              </div>
              <a href="https://drive.google.com/file/d/1gga0H4vP5KKIXxGfcT-hujngXmNgUrDr/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="certificate-link magnetic">
                <span>View Certificate</span>
                <div className="link-arrow">→</div>
              </a>
              <div className="certificate-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Experience Section */}
      <section id="experience" className="experience-section">
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="title-text">Professional Experience</span>
            <div className="title-underline"></div>
          </h2>
          <div className="experience-timeline">
            <div className="experience-item animate-on-scroll magnetic">
              <div className="experience-date">2024</div>
              <div className="experience-content">
                <h3>Data Visualization Intern</h3>
                <h4>FreeCodeCamp</h4>
                <p>Developed interactive data visualizations and dashboards using modern web technologies. Created comprehensive data analysis reports and contributed to open-source projects.</p>
              </div>
            </div>
            
            <div className="experience-item animate-on-scroll magnetic">
              <div className="experience-date">2024</div>
              <div className="experience-content">
                <h3>Applied Data Science Lab</h3>
                <h4>WorldQuant University</h4>
                <p>Completed advanced data science projects focusing on real-world applications. Gained expertise in statistical modeling, machine learning, and data-driven decision making.</p>
              </div>
            </div>
            
            <div className="experience-item animate-on-scroll magnetic">
              <div className="experience-date">2023</div>
              <div className="experience-content">
                <h3>Machine Learning & Data Science Intern</h3>
                <h4>PHN Technology</h4>
                <p>Implemented machine learning algorithms for business solutions. Worked on data preprocessing, model development, and deployment of ML systems in production environments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="contact-section">
        <div className="contact-background">
          <div className="contact-particles"></div>
          <div className="contact-grid-overlay"></div>
        </div>
        <div className="container">
          <h2 className="section-title animate-on-scroll">
            <span className="title-text">Let's Connect & Collaborate</span>
            <div className="title-underline"></div>
          </h2>
          
          <div className="contact-main-content">
            <div className="contact-left animate-on-scroll">
              <div className="contact-hero-text">
                <h3>Ready to Build Something Amazing?</h3>
                <p>I'm always excited to work on innovative projects that push the boundaries of AI and Data Science. Let's turn your ideas into reality!</p>
              </div>
              
              <div className="contact-info-cards">
                <div className="info-card-contact magnetic">
                  <div className="card-icon">
                    <FaEnvelope />
                  </div>
                  <div className="card-content">
                    <h4>Email Me</h4>
                    <p>bhanuprakashguddeti@gmail.com</p>
                  </div>
                  <div className="card-glow"></div>
                </div>
                
                <div className="info-card-contact magnetic">
                  <div className="card-icon">
                    <FaLinkedin />
                  </div>
                  <div className="card-content">
                    <h4>LinkedIn</h4>
                    <p>Professional Network</p>
                  </div>
                  <div className="card-glow"></div>
                </div>
                
                <div className="info-card-contact magnetic">
                  <div className="card-icon">
                    <FaGithub />
                  </div>
                  <div className="card-content">
                    <h4>GitHub</h4>
                    <p>Code Repository</p>
                  </div>
                  <div className="card-glow"></div>
                </div>
              </div>
            </div>
            
            <div className="contact-right animate-on-scroll">
              <div className="contact-form-container">
                <div className="contact-avatar">
                  <div className="avatar-ring"></div>
                  <div className="avatar-image">
                    <span>BP</span>
                  </div>
                  <div className="avatar-status">
                    <span className="status-dot"></span>
                    <span>Available for projects</span>
                  </div>
                </div>
                
                <div className="contact-actions">
                  <a href="mailto:bhanuprakashguddeti@gmail.com" className="contact-btn primary magnetic">
                    <FaEnvelope />
                    <span>Send Email</span>
                    <div className="btn-particles"></div>
                  </a>
                  
                  <a href="tel:+918096009638" className="contact-btn mobile magnetic">
                    <div className="mobile-icon">📱</div>
                    <span>Call Me</span>
                    <div className="mobile-number">+91 8096009638</div>
                    <div className="btn-particles"></div>
                  </a>
                  
                  <a href="https://www.linkedin.com/in/bhanu-prakash-guddeti-822a9522a/" target="_blank" rel="noopener noreferrer" className="contact-btn secondary magnetic">
                    <FaLinkedin />
                    <span>Connect on LinkedIn</span>
                    <div className="btn-particles"></div>
                  </a>
                  
                  <a href="https://github.com/Bhanuprakashgu" target="_blank" rel="noopener noreferrer" className="contact-btn tertiary magnetic">
                    <FaGithub />
                    <span>View GitHub</span>
                    <div className="btn-particles"></div>
                  </a>
                  
                  <a href="https://leetcode.com/u/bhanuprakashguddeti/" target="_blank" rel="noopener noreferrer" className="contact-btn quaternary magnetic">
                    <FaCode />
                    <span>LeetCode Profile</span>
                    <div className="btn-particles"></div>
                  </a>
                </div>
                
                <div className="contact-stats">
                  <div className="stat-item">
                    <span className="stat-number">100+</span>
                    <span className="stat-label">Problems Solved</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">5+</span>
                    <span className="stat-label">Projects Completed</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-footer animate-on-scroll">
            <div className="footer-message">
              <p>🚀 Let's innovate together and create the future of AI!</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

