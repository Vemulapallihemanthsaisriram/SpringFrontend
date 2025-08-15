import React, { useContext, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Header.css';
import { UserContext } from '../context/UserProvider';

const logoText = 'Spring';
const subtitle = 'JAVA & SPRING BOOT';

function Header() {
    const [kebabOpen, setKebabOpen] = useState(false);
    const charsRef = useRef([]);
    const subtitleRef = useRef();
    const logoContainerRef = useRef();


    const { getToken } = useContext(UserContext);
    const userToken = getToken();

    let logoLoop;
    let subtitleLoop;
    const handleLogoHover = () => {

        if (!logoLoop) {
            logoLoop = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power1.inOut' } });
            logoLoop.to(charsRef.current, {
                rotateY: 360,
                duration: 1.2,
                stagger: 0.09,
            }).to(charsRef.current, {
                rotateY: 0,
                duration: 1.2,
                stagger: 0.09,
            });
        }

        if (!subtitleLoop) {
            gsap.to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: 'power1.inOut',
            });
            subtitleLoop = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power1.inOut' } });
            subtitleLoop.to(subtitleRef.current.querySelectorAll('.subtitle-char'), {
                rotateX: 360,
                duration: 1.2,
                stagger: 0.07,
            }).to(subtitleRef.current.querySelectorAll('.subtitle-char'), {
                rotateX: 0,
                duration: 1.2,
                stagger: 0.07,
            });
        }
    };

    // Reset on mouse leave
    const handleLogoLeave = () => {
        if (logoLoop) {
            logoLoop.kill();
            logoLoop = null;
        }
        if (subtitleLoop) {
            subtitleLoop.kill();
            subtitleLoop = null;
        }
        gsap.to(charsRef.current, {
            rotateY: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: 'power1.inOut',
        });
        gsap.to(subtitleRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'power1.inOut',
        });
        gsap.to(subtitleRef.current.querySelectorAll('.subtitle-char'), {
            rotateX: 0,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power1.inOut',
        });
    };

    return (
        <header className="header">
            <div className="header_container">
                <div
                    className="header_logo"
                    ref={logoContainerRef}
                    onMouseEnter={handleLogoHover}
                    onMouseLeave={handleLogoLeave}
                >
                    <a href="/" className="logo_link">
                        {logoText.split('').map((char, i) => (
                            <span
                                key={i}
                                ref={el => (charsRef.current[i] = el)}
                                className="logo-char"
                                style={{ display: 'inline-block', perspective: '300px' }}
                            >
                                {char}
                            </span>
                        ))}
                    </a>
                    <div
                        className="logo_subtitle"
                        ref={subtitleRef}
                    >
                        {subtitle.split('').map((char, i) => (
                            <span
                                key={i}
                                className="subtitle-char"
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </span>
                        ))}
                    </div>
                </div>

                
                {userToken == null && <nav className="header_nav">
                    <ul className="nav_list">
                        <li><a href="/login" className="nav_link">Login</a></li>
                        <li><a href="/register" className="nav_link">Register</a></li>
                    </ul>
                </nav>}

                
                <div className="kebab-menu" style={{ display: 'none', position: 'relative', paddingLeft: '100px' }}>
                    <div
                        className="kebab-icon"
                        aria-label="Open menu"
                        tabIndex={0}
                        onClick={() => setKebabOpen(v => !v)}
                        onBlur={() => setTimeout(() => setKebabOpen(false), 200)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="5" r="2" />
                            <circle cx="12" cy="12" r="2" />
                            <circle cx="12" cy="19" r="2" />
                        </svg>
                    </div>
                    <div className={`kebab-dropdown${kebabOpen ? ' open' : ''}`}>
                        <a href="/login" className="nav_link" onClick={() => setKebabOpen(false)}>Login</a>
                        <a href="/register" className="nav_link" onClick={() => setKebabOpen(false)}>Register</a>
                    </div>
                </div>

                <a className="header_profile" href='/profile'>
                    <button className="profile_btn">
                        <div className="profile_icon">
                            <svg className="user_icon" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    </button>
                </a>
            </div>
        </header>
    );
}

export default Header;