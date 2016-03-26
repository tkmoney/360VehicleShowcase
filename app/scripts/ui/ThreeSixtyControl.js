var React = window.React = require('react'),
    ViewBox = require('./ViewBox'),
    ImgSprite = require('./ImgSprite'),
    $ = require('jquery');


var ThreeSixtyControl = React.createClass({
    _down_x: 0,
    _isDown: false,
    _last_delta: 0,
    getDefaultProps: function(){
        return {frames: 35, frameWidth: 960, frameHeight: 540};
    },
    getInitialState: function() {
        return {car: 'car1', body:'body1', wheels: 'wheels1', currentFrame: 0};
    },
    goToPrevFrame: function(){
        if(this.state.currentFrame <= 0){
            this.setState({currentFrame: this.props.frames});
        }else{
            this.setState({currentFrame: (this.state.currentFrame - 1)});
        }
    },
    goToNextFrame: function(){
        console.log('going to next frame!');
        if(this.state.currentFrame >= this.props.frames){
            this.setState({currentFrame: 0});
        }else{
            this.setState({currentFrame: (this.state.currentFrame + 1)});
        }

    },
    componentDidMount: function(){
        //$(this.refs.container).on('mousedown touchstart pointerdown MSPointerDown', this.onDown);
        //$(this.refs.container).on('mouseup mouseleave touchend pointerup pointerout MSPointerUp MSPointerOut touchcancel', this.onUp);
        //$(this.refs.container).on('mousemove touchmove pointermove MSPointerMove', this.onMove);
    },
    onDown: function(e){
        console.log('onDown');
        var x = 0;
        if(e.type == 'touchstart'){
            x = e.touches[0].screenX;
        }else{
            x = e.screenX;
        }

        this._isDown = true;
        this._down_x = x;
        this._last_delta = x;

        $(this.refs.container).addClass('grabbing');
    },
    onMove:function(e){
        console.log('onmove: isdown: ', this._isDown);

        var x = 0;
        if(e.type == 'touchmove'){
            x = e.touches[0].screenX;
        }else{
            x = e.screenX;
        }

        if(this._isDown && (x % 3 == 0)){
            var delta = (this._down_x - x);
            if(delta > this._last_delta){
                this.goToPrevFrame();
            }else if(delta < this._last_delta){
                this.goToNextFrame();
            }


            this._last_delta = delta;
        }
    },
    onUp: function(e){
        console.log('mouse up');

        this._isDown = false;
        this._last_delta = 0;
        $(this.refs.container).removeClass('grabbing');

    },
    getStyle: function(){

        return {
            width: '%px'.replace('%', this.props.frameWidth),
            height: '%px'.replace('%',this.props.frameHeight)
        };
    },
    render: function() {
        return (
            <div className="threesixty_wrapper">
                <p><button className="prev_button" onClick={this.goToPrevFrame}>Prev</button><button className="next_button" onClick={this.goToNextFrame}>Next</button></p>
                <div className="threesixty_container" ref="container" onTouchStart={this.onDown} onMouseDown={this.onDown} onTouchMove={this.onMove} onMouseMove={this.onMove} onTouchCancel={this.onUp} onTouchEnd={this.onUp} onMouseUp={this.onUp} onMouseLeave={this.onUp} onMouseOut={this.onUp} >
                    <ViewBox>
                        <div style={this.getStyle()}>
                            <ImgSprite {...this.props} path={this.props.bodysprite} currentFrame={this.state.currentFrame} />
                            <ImgSprite {...this.props} path={this.props.wheelsprite} currentFrame={this.state.currentFrame} />
                        </div>
                    </ViewBox>
                </div>
              </div>
        );
    }
});


module.exports = ThreeSixtyControl;
