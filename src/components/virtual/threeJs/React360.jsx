import { Component } from "react";
import "./React360.css";

const pixelsPerDegree = 3;
const style = {
  fill: 'rgba(0,222,0, 0.5)',
  stroke: 'rgba(0, 0, 0, 0.5)',
  strokeWidth: 2,
  cursor: 'pointer',
};


class ThreeJS extends Component {
  static defaultProps = { dir: "/assets/images/3d", numImages: 3 };

  state = {
    dragging: false,
    imageIndex: 0,
    dragStartIndex: 0,
    images: [],
    show360: false,
    imgs:null
  };

  componentDidMount = () => {
    document.addEventListener("mousemove", this.handleMouseMove, false);
    document.addEventListener("mouseup", this.handleMouseUp, false);
  };


  componentWillUnmount = () => {
    document.removeEventListener("mousemove", this.handleMouseMove, false);
    document.removeEventListener("mouseup", this.handleMouseUp, false);
  };

  handleMouseDown = (e) => {
    e.persist();
    this.setState((state) => ({
      dragging: true,
      dragStart: e.screenX || Math.round(e?.touches?.[0]?.clientX),
      dragStartIndex: state.imageIndex,
    }));
  };

  handleMouseUp = () => {
    this.setState({ dragging: false });
  };

  updateImageIndex = (currentPosition) => {
    let numImages = this.props.numImages;
    const pixelsPerImage = pixelsPerDegree * (360 / numImages);
    const { dragStart, imageIndex, dragStartIndex } = this.state;
    // pixels moved
    let dx = (currentPosition - dragStart) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;
    // console.log(index, dragStartIndex, numImages)
    if (index !== imageIndex) {
      this.setState({ imageIndex: index });
    }
  };

  handleMouseMove = (e) => {
    //   console.log("handleMouseMove",this.state.dragging)
    console.log("screenX", Math.round(e?.touches?.[0]?.clientX));
    if (this.state.dragging) {
      this.updateImageIndex(e.screenX || Math.round(e?.touches?.[0]?.clientX));
    }
  };

  preventDragHandler = (e) => {
    e.preventDefault();
  };

  renderSvg = () => {
    return (
      <svg
        width={"100%"}
        height={"100%"}
        className="image"
        viewBox={this.props.images[this.state.imageIndex]?.viewBox}
      >
        <image
          xlinkHref={this.props.images[this.state.imageIndex]?.img}
          width={this.props.images[this.state.imageIndex]?.imageWidth}
          height={this.props.images[this.state.imageIndex]?.imageHeight}
        />
        {this.props.images[this.state.imageIndex]?.points.map(
          (point, index) => (
            <path
              onClick={() => {
                alert(point);
              }}
              key={index}
              d={point}
              style={style}
            />
          )
        )}
      </svg>
    );
  }

  render = () => {
    return (
      <div
        className="react-360-img"
        onMouseDown={this.handleMouseDown}
        onDragStart={this.preventDragHandler}
        onTouchStart={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onTouchEnd={this.handleMouseUp}
      >
        {this.renderSvg()}
      </div>
    );
  };
}

export default ThreeJS;