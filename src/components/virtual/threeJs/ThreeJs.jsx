import  { Component } from "react";
import "./React360.css";

const pixelsPerDegree = 3;
const style = {
  fill: 'rgba(0,222,0, 0.5)',
  stroke: 'rgba(0, 0, 0, 0.5)',
  strokeWidth: 2,
  cursor: 'pointer',
  zIndex: 990,
};

class ThreeJS extends Component {
  static defaultProps = { dir: "/projekti/assets/images/3d", numImages: 3 };

  state = {
    dragging: false,
    imageIndex: 0,
    dragStartIndex: 0,
    images: [],
    show360: false,
    imgs: null,
    isSmallDevice: window.innerWidth < 600,
    hoveredPathId: null, // To track hovered path ID
  };

  componentDidMount = () => {
    document.addEventListener("mousemove", this.handleMouseMove, false);
    document.addEventListener("mouseup", this.handleMouseUp, false);
    window.addEventListener('resize', this.handleResize);

    this.setState({ isSmallDevice: window.innerWidth < 768 }); // Adjust for tablets as well  
  };

  componentWillUnmount = () => {
    document.removeEventListener("mousemove", this.handleMouseMove, false);
    document.removeEventListener("mouseup", this.handleMouseUp, false);
    window.removeEventListener('resize', this.handleResize);
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

  handleResize = () => {
    this.setState({ isSmallDevice: window.innerWidth < 600 });
  };

  updateImageIndex = (currentPosition) => {
    let numImages = this.props.numImages;
    const pixelsPerImage = pixelsPerDegree * (360 / numImages);
    const { dragStart, imageIndex, dragStartIndex } = this.state;
    // let dx = (currentPosition - dragStart) / pixelsPerImage;
    let dx = (dragStart - currentPosition) / pixelsPerImage;
    let index = Math.floor(dx) % numImages;

    if (index < 0) {
      index = numImages + index - 1;
    }
    index = (index + dragStartIndex) % numImages;
    if (index !== imageIndex) {
      this.setState({ imageIndex: index });
    }
  };

  handleMouseMove = (e) => {
    if (this.state.dragging) {
      this.updateImageIndex(e.screenX || Math.round(e?.touches?.[0]?.clientX));
    }
  };

  preventDragHandler = (e) => {
    e.preventDefault();
  };

  handleMouseOver = (id) => {
    this.setState({ hoveredPathId: id });
  };

  handleMouseOut = () => {
    this.setState({ hoveredPathId: null });
  };

  renderSvg = () => {

    const svgWidth = this.state.isSmallDevice ? '100%' : '100%';
    // const svgHeight = this.state.isSmallDevice ? '100%' : '100vh';
    const svgHeight = '100vh';


    return this.props.images.map((image, i) => (
      <svg
        key={i}
        // width={this.state.isSmallDevice ? "100%" : "100%"}
        // height={"100vh"}
        width={svgWidth}
        height={svgHeight}

        id={`image-${i}`}
        className={`image ${i === this.state.imageIndex ? "active" : ""}`}
        viewBox={image.viewBox}
      >
        <image
          xlinkHref={image.img}
          width={image.imageWidth}
          height={image.imageHeight}
          transform={image.transform}
        />
        {this.props.showSvg && image.points.map((point, index) => {
          if (image.pathType === 'polygon') {
            return (
              <polygon
                key={index}
                points={point.path}
                className="threejs-point"
                onMouseOver={() => this.handleMouseOver(point.id)}
                onMouseOut={this.handleMouseOut}
                onClick={() => {
                  window.location.assign(`/projekti/#/objekti/H${point.id}`);
                }}
              />
            );
          }
          if (image.pathType === 'path') {
            return (
              <>
                <path
                  key={index}
                  d={point.path}
                  className="threejs-point"
                  onMouseOver={() => this.handleMouseOver(point.id)}
                  onMouseOut={this.handleMouseOut}
                  onClick={() => {
                    window.location.assign(`/projekti/#/objekti/H${point.id}`);
                  }}
                />
              </>
            );
          }
        })}
      </svg>
    ));
  };

  render = () => {
    const { hoveredPathId, imageIndex } = this.state;

    return (
      <div
        onMouseDown={this.handleMouseDown}
        onDragStart={this.preventDragHandler}
        onTouchStart={this.handleMouseDown}
        onTouchMove={this.handleMouseMove}
        onTouchEnd={this.handleMouseUp}
      >
        {this.renderSvg()}
        {/* {hoveredPathId && (
          <p style={{
            position: 'absolute',
            top: '100px',
            left: '20px',
            color: 'red',
            fontSize: '40px',
            zIndex: 999999999
          }}>
            Hovering over path ID: {hoveredPathId}
          </p>
        )}
        <p style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          color: 'red',
          fontSize: '40px',
          zIndex: 999999999
        }}>
          SVG Index: {imageIndex + 1}
        </p> */}
      </div>
    );
  };
}

export default ThreeJS;
