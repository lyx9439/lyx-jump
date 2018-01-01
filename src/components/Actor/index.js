import React, { Component } from 'react';
import './index.css'

export default class Actor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.keyDownTime = 0
        this.keyUpTime = 0
        this.canJump = true;
    }
    componentDidMount() {
        document.addEventListener('keydown', this.docKeyDown)
        document.addEventListener('keyup', this.docKeyUp)
    }
    docKeyDown = (e) => {
        if (!this.canJump) {
            return
        }
        this.keyDownTime = this.keyDownTime || new Date().getTime();
        let keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode === 32) {
            if (!document.getElementById("actor").className.includes(' squat')) {
                document.getElementById("actor").className += ' squat'
            }
        }
    }
    docKeyUp = (e) => {
        if (!this.canJump) {
            return
        }
        this.keyUpTime = this.keyUpTime || new Date().getTime();
        let keyCode = e.keyCode || e.which || e.charCode;
        if (keyCode === 32) {
            document.getElementById('actor').className = document.getElementById('actor').className.split(' squat').join('');
            this.animation(document.getElementById('actor'))({ left: (this.keyUpTime - this.keyDownTime) * 120 / 1000, time: 200 })
        }
    }
    animation = dom => ({ left, bottom = 100, time }) => {
        this.canJump = false;
        let initLeft = parseInt(dom.style.left, 10) || 0;
        let initBottom = parseInt(dom.style.bottom, 10) || 0;
        let interval = 20, times = parseInt(time / interval / 2) * 2, leftSpeed = left / times, bottomSpeed = bottom / times * 2, currentTime = 0

        dom.style.transitionDuration = time + 'ms'
        let s = setInterval(() => {
            if (currentTime < times) {
                initLeft += leftSpeed
                if (currentTime < times / 2) {
                    initBottom += bottomSpeed
                } else {
                    initBottom -= bottomSpeed
                }
                dom.style.left = initLeft + 'px'
                dom.style.bottom = initBottom + 'px'
                currentTime++
            } else {
                clearInterval(s)
                this.canJump = true;
                this.keyDownTime = 0;
                this.keyUpTime = 0;
                dom.style.transitionDuration = ''
            }
        }, interval)

    }
    render() {
        return (
            <div id="actor">

            </div>
        )
    }
}