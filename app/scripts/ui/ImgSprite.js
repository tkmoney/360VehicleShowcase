var React = window.React = require('react');

var ImgSprite = React.createClass({
    getDefaultProps: function(){
        return {path: '', frames: 35, imgs: [], currentFrame: 0, frameWidth: 960, frameHeight: 540};
    },
    renderImage: function(){
        var width_x = (this.props.frameWidth * this.props.currentFrame);
        var style = {
            width: ('%px'.replace('%', this.props.frameWidth)),
            height: ('%px'.replace('%', this.props.frameHeight)),
            backgroundImage: 'url(%)'.replace('%', this.props.path),
            backgroundPosition: ('-%px 0px'.replace('%', (width_x)))
        };

        return (<div className="sprite_image" style={style}></div>);
    },
    render: function() {
        return (this.renderImage());
    }
});

module.exports = ImgSprite;
