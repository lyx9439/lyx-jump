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
        this.initLeft = 0;
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
        let initBottom = parseInt(dom.style.bottom, 10) || 0;
        let interval = 20, times = parseInt(time / interval / 2, 10) * 2, leftSpeed = left / times, currentTime = 0, _left = this.initLeft;

        dom.style.transitionDuration = time + 'ms'
        let s = setInterval(() => {
            _left += leftSpeed
            if (currentTime < times) {
                // 算法待优化
                initBottom = - (4 * bottom / left / left) * Math.pow(_left - (this.initLeft + left / 2), 2) + bottom
                dom.style.left = _left + 'px'
                dom.style.bottom = initBottom + 'px'
                currentTime++
            } else {
                clearInterval(s)
                this.canJump = true;
                this.keyDownTime = 0;
                this.keyUpTime = 0;
                dom.style.transitionDuration = ''
                this.initLeft += left;
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