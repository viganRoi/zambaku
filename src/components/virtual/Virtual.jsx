import { useEffect, useState } from 'react';
// import './style.scss';
import axios from 'axios';
import ThreeJS from './threeJs/ThreeJs';
import { CircularProgress } from '@mui/material';
import { svg } from './svgData';

let totalImages = 360;
let imageDir = `/assets/images/virtual`;
let imagePattern = "{index}.webp";
// let imagePattern = "{index}.jpg";

const Virtual = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSvg, setShowSvg] = useState(false);
  const [progress, setProgress] = useState(0);
  const [firstImage, setFirstImage] = useState(100);

  async function fetchImages() {
    setLoading(true);
    const images = [];
    const orderedIndices = [
      ...Array.from({ length: totalImages - firstImage }, (_, i) => i + firstImage),
      ...Array.from({ length: firstImage }, (_, i) => i),
    ];
  
    for (let i = 0; i < totalImages; i++) {
      const index = orderedIndices[i];
      // const res = await axios.get(`${imageDir}/${imagePattern.replace("{index}", index)}`, { responseType: 'arraybuffer' });
      const res = await axios.get(`${imageDir}/${imagePattern.replace("{index}", index)}`, { responseType: 'arraybuffer' });
      const blob = new Blob([res.data], { type: 'image/jpeg' });
      images.push({
        points: svg[index].points,
        img: URL.createObjectURL(blob),
        imageWidth: svg[index].imageWidth,
        pathType: svg[index].pathType,
        imageHeight: svg[index].imageHeight,
        viewBox: svg[index].viewBox,
        transform: svg[index].transform,
      });
  
      setProgress(Math.floor(((i + 1) / totalImages) * 100));
    }
  
    setImages(images);
    setLoading(false);
  }
  

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className='h-screen w-full flex items-center justify-center relative'>
        {loading ? (
          <div className='w-full h-full flex items-center justify-center'>
            <div className='relative flex flex-inline'>
              <CircularProgress
                variant="determinate"
                value={progress}
                size={80}
                sx={{ color: '#fff', }}
              />
              <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
                <h1 className='text-xl font-bold text-white'>{`${progress}%`}</h1>
              </div>
            </div>
          </div>
        ) : (
          <div className='w-full h-full object-cover absolute top-0 left-0 flex items-center justify-center'>
            <ThreeJS images={images} dir={imageDir} numImages={totalImages} showSvg={showSvg} />
          </div>
        )}
    </div>
  );
}

export default Virtual;
