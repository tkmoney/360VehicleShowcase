var React = window.React = require('react');

var ViewBox = React.createClass({
    getInitialState: function(){
        return {container_height: 0, container_width: 0, styles :{}}
    },
    scaleView: function(){
        var s = this.getStyle();
        this.setState({styles: s});
    },
    componentDidMount: function(){
        this.scaleView();
        $(window).on('resize', this.scaleView);
    },
    getStyle: function(){
        var container = React.findDOMNode(this.refs.container);

        if(!container){
            return {}
        }
        var target = React.findDOMNode(this.refs.target);

        var w = target.clientWidth;
        var h = target.clientHeight;
        var bw = container.clientWidth;
        var bh = container.clientHeight;
        var wRatio = bw / w;
        var hRatio = bh / h;
        var mRatio = Math.min(wRatio, hRatio);
        var transX = Math.abs(bw - (w * mRatio)) / 2;
        var transY = Math.abs(bh - (h * mRatio)) / 2;
        var string = 'translate(' + transX + 'px, ' + transY + 'px) scale(' + mRatio + ')';
        var styles = {
            transform: string,
            transformOrigin: '0 0'
        };
        return (styles);
    },
    render: function(){
        return (<div className="viewbox" ref="container"><div ref="target" className="viewbox_target" style={this.state.styles} >{this.props.children}</div></div>);
    }

});

module.exports = ViewBox;
