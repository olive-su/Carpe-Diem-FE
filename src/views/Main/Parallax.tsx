import React, { useState, useEffect } from 'react';
import './parallax.css';

export default function Parallax() {
    const [position, setPositon] = useState(0);

    function onScroll() {
        setPositon(window.scrollY);
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // let beforeScrollY = 0;
    // let menu = document.getElementsByClassName('et-header__logo');

    // useEffect(() => {
    //     window.addEventListener('scroll', scrollDirection);
    //     if (token) {
    //         setIsLoggedIn(true);
    //     } else {
    //         setIsLoggedIn(false);
    //     }
    // }, []);

    // const scrollDirection = () => {
    //     if (window.pageYOffset > beforeScrollY) {
    //         setIsNavOn(false);
    //     } else {
    //         setIsNavOn(true);
    //     }
    //     beforeScrollY = window.pageYOffset
    // }

    return (
        <>
            <header className="et-header">
                <div className="et-header__left">
                    <a href="" className="et-header__logo">
                        My Header
                    </a>
                </div>
            </header>
            <div className="carpe">
                <span className="c1 span">C</span>
                <span className="c2 span">A</span>
                <span className="c3 span">R</span>
                <span className="c4 span">P</span>
                <span className="c5 span">E</span>
                <span className="c6 span">D</span>
                <span className="c7 span">I</span>
                <span className="c8 span">E</span>
                <span className="c9 span">M</span>
                <span className="c10 span"></span>
                <div className="bg"></div>
            </div>

            {/* <div style={{ scrollBehavior: 'smooth' }}>
                <div
                    style={{
                        backgroundPositionY: position / 2,
                        fontFamily: 'Fredoka One',
                        fontSize: '100px',
                    }}
                >
                    <div className="sticky-elem performance-info a">
                        <p>
                            <span className="br">c</span>
                        </p>
                    </div>
                    <div className="sticky-elem performance-info b">
                        <p>a</p>
                    </div>
                    <div className="sticky-elem performance-info c">
                        <p>r</p>
                    </div>
                </div>

                <div
                    style={{
                        backgroundPositionY: position / -3,
                    }}
                >
                    <div style={{ backgroundColor: 'yellow', height: '400px' }}>Happy new year</div>
                </div>
                <p style={{ transform: `translateX(${-position}px)` }}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quia tempora accusantium molestias dignissimos doloribus sed
                    blanditiis officiis quidem, atque deserunt vitae, inventore suscipit expedita vero illum provident mollitia reiciendis!
                </p>
                <p style={{ transform: `translateX(${position}px)` }}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum hic natus corporis! Illo veniam a natus culpa nulla eligendi iure,
                    provident eveniet repellat accusamus, nihil quasi ad voluptatum consequuntur optio!
                </p>
                <p
                    style={{
                        opacity: position - 700,
                    }}
                >
                    1
                </p>
                <p className="desc3">2</p>
                <p className="desc3">3</p>
                <p className="desc3">4</p>
            </div> */}
        </>
    );
}
