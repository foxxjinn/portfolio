// # Released under MIT License
// Copyright (c) 2020, Jinn Foxx
//
// Original author is Frank from Frank's Laboratory
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), 
// to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
// and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
// IN THE SOFTWARE.
//
// The main source of this code is from Frank's Laboratory
// https://www.youtube.com/watch?v=XGioNBHrFU4&ab_channel=Frankslaboratory
// with several modifications by Jinn Foxx

; (function(){

    let particleArray = []
    const mouse = {
        x: null,
        y: null,
        lastX: null,
        lastY: null,
        radius: 150
    }
    let canvas,
        ctx
    let mouseRadius = 150

    class Particle {
        constructor(x, y) {
            this.x = x
            this.y = y
            this.size = 3
            this.baseX = this.x
            this.baseY = this.y
            this.density = (Math.random() * 30) + 1 // how far and fast it moves away from mouse 
        }

        step(ctx, mouse) {
            this._update(mouse)
            this._draw(ctx)
        }

        _draw(ctx) {
            console.log('hi')
            ctx.fillyStyle = 'white';
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
            ctx.closePath()
            ctx.fill()
        }

        _update(mouse) {
            let dx = mouse.x - this.x
            let dy = mouse.y - this.y
            let distance = Math.hypot(mouse.x - this.x, mouse.y - this.y)
            let forceDirectionX = dx / distance
            let forceDirectionY = dy / distance
            let maxDistance = mouseRadius
            let force = (maxDistance - distance) / maxDistance
            let directionX = forceDirectionX * force * this.density
            let directionY = forceDirectionY * force * this.density
            if (distance < mouseRadius) {
                this.x += forceDirectionX
                this.y += forceDirectionY
            } else {
                
            }

        }
    }

    /**
     * Turns text into an interactive animation with the mouse
     * @param {OBJECT} canvas HTML Canvas object
     * @param {STRING} text  This is the text that you want displayed
     */
    function textWarp(canvas, text = 'hello') {
        if (!(canvas instanceof HTMLCanvasElement)) {
            throw TypeError('textWarp must recieve an HTMLCanvasElement')
        }

        if (typeof text !== 'string') {
            throw TypeError('textWarp: second parameter must be a string')
        }

        // initiate Canvas
        
        ctx = canvas.getContext('2d')
        canvas.addEventListener('mousemove', (e) =>{
            mouse.x = e.clientX
            mouse.y = e.clientY
        })

        ctx.fillStyle = 'blue';
        ctx.font = '30px Verdana';
        ctx.fillText('A', 0, 30)
        const data = ctx.getImageData(0, 0, 100, 100)
        ctx.strokeStyle = 'red';

        initializeParticles()
        animate(canvas, ctx)

    }

    function initializeParticles() {
        particleArray.push(new Particle(50, 50))
        particleArray.push(new Particle(80, 50))
    }

    function animate(canvas, ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (let particle of particleArray) {
            particle.step(ctx, mouse)
        }
        if (mouse.x !== mouse.lastX && mouse.y !== mouse.lastY) {
            mouse.lastX = mouse.x
            mouse.lastY = mouse.y
            requestAnimationFrame(animate)
        } 
        requestAnimationFrame(animate)
    }

    // Export
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function() {
            return textWarp;
        });
        } else if (typeof module !== 'undefined' && module.exports) {
            module.exports = textWarp;
            module.exports.textWarp = textWarp;
        } else {
            window.textWarp = textWarp;
    }
})();