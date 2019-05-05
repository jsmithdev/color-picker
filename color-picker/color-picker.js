'use strict()'

const template = document.createElement('template')
template.innerHTML = /*html*/`

<style type="text/css">

/* Common stuff */
.picker-wrapper, 
.slide-wrapper {
    position: relative;
    float: left;
}
.picker-indicator,
.slide-indicator {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
}
.picker,
.slide {
    cursor: crosshair;
    float: left;
}

/* Default skin */

.cp-default {
    background-color: gray;
    padding: 12px;
    box-shadow: 0 0 40px #000;
    border-radius: 15px;
    float: left;
}
.cp-default .picker {
    width: 200px;
}
.cp-default .slide {
    width: 30px;
    
}
.cp-default .slide-wrapper {
    margin-left: 10px;
}
.cp-default .picker-indicator {
    width: 5px;
    height: 5px;
    border: 2px solid darkblue;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    opacity: .5;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
    filter: alpha(opacity=50);
    background-color: white;
}
.cp-default .slide-indicator {
    width: 100%;
    height: 10px;
    left: -4px;
    opacity: .6;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=60);
    filter: alpha(opacity=60);
    border: 4px solid lightblue;
    -moz-border-radius: 4px;
    -o-border-radius: 4px;
    -webkit-border-radius: 4px;
    border-radius: 4px;
    background-color: white;
}

/* Small skin */

.cp-small {
    padding: 5px;
    background-color: white;
    float: left;
    border-radius: 5px;
}
.cp-small .picker {
    width: 100px;
    height: 100px;
}
.cp-small .slide {
    width: 15px;
    height: 100px;
}
.cp-small .slide-wrapper {
    margin-left: 5px;
}
.cp-small .picker-indicator {
    width: 1px;
    height: 1px;
    border: 1px solid black;
    background-color: white;
}
.cp-small .slide-indicator {
    width: 100%;
    height: 2px;
    left: 0px;
    background-color: black;
}

/* Fancy skin */

.cp-fancy {
    padding: 10px;
/*    background-color: #C5F7EA; */
    background: -webkit-linear-gradient(top, #aaa 0%, #222 100%);   
    float: left;
    border: 1px solid #999;
    box-shadow: inset 0 0 10px white;
}
.cp-fancy .picker {
    width: 200px;
    height: 200px;
}
.cp-fancy .slide {
    width: 30px;
    height: 200px;
}
.cp-fancy .slide-wrapper {
    margin-left: 10px;
}
.cp-fancy .picker-indicator {
    width: 24px;
    height: 24px;
    background-image: url(http://cdn1.iconfinder.com/data/icons/fugue/bonus/icons-24/target.png);
}
.cp-fancy .slide-indicator {
    width: 30px;
    height: 31px;
    left: 30px;
    background-image: url(http://cdn1.iconfinder.com/data/icons/bluecoral/Left.png);
}

/* Normal skin */

.cp-normal {
    background-color: white;
    border-left: 4px solid #d6d6d6;
}
.cp-normal .picker {
    width: 200px;
    height: auto;
}
.cp-normal .slide {
    width: 30px;
    height: auto;
}
.cp-normal .slide-wrapper {
    margin-left: 10px;
}
.cp-normal .picker-indicator {
    width: 5px;
    height: 5px;
    border: 1px solid gray;
    opacity: .5;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
    filter: alpha(opacity=50);
    background-color: white;
    pointer-events: none;
}
.cp-normal .slide-indicator {
    width: 100%;
    height: 10px;
    left: -4px;
    opacity: .6;
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";
    filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=60);
    filter: alpha(opacity=60);
    border: 4px solid gray;
    background-color: white;
    pointer-events: none;
}
    .view {
        width: 100%;
        height: 250px;
    }
    .wrapper {
        bottom: 0;
        float: right;
    }
    .card {
        
        padding: 1rem;
        background-color: white;
    }
</style>

<div class="card">
    <div class="view">
        <div class="wrapper"></div>
    </div>
</div>
`

export class ColorPick extends HTMLElement {

    constructor() {
        super()
        //console.log('hi from constructor')
        this.attachShadow({mode: 'open'})
    }
    static get is() {
        return 'color-picker'
    }

    static get observedAttributes() {
        return ['color']
    }

    getColor() {
        return this.color
    }

    setColor(hex, user) {
        
        this.color = hex
        if(this.dom) { this.dom.view.style.backgroundColor = this.color }
        if(this.CP && !user) { this.CP.setHex(this.color) }
        
    }

    connectedCallback() {

        this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.registerElements(this.shadowRoot)
    }
    registerElements(doc){
        
        this.dom = {
            wrapper: doc.querySelector('.wrapper'),
            view: doc.querySelector('.view'),
            set: doc.querySelector('.set'),
        }
	    
		this.init()
    }
    
    init(){

        this.dom.wrapper.classList.add(this.theme ? this.theme : 'cp-normal')

        const color = this.getAttribute('color')
        this.setColor(color ? color : '#2287b5')

        this.CP = ColorPicker(
            this.dom.wrapper,
            (hex, hsv, rgb, pickerCoordinate, sliderCoordinate) => {
                const fromUser = true
                this.setColor(hex, fromUser)
            }
        );

    }

	
    attributeChangedCallback(n, ov, nv) {
        console.log('attr => ')
        if(ov != nv){
            switch (n) {
                case 'color':

                    const fromUser = false
                    this.setColor(nv, fromUser)
                    
                    break
                case 'theme':
                    this.theme = nv
            }
        }
    }
}

customElements.define(ColorPick.is, ColorPick);