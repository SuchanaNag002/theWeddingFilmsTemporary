import Image from 'next/image';
import loadingImage from '../../styles/Loading_State/loadingImage.gif';
import  '../../styles/Loading_State/Buffer.css';

const Buffer = () => {
  return (
    <div className='buffer-container'>
    <div className='image-container'>
      <Image src={loadingImage} alt="Loading" priority={true} />
      <p className='loading-text'>Loading...</p>
    </div>
  </div>
  );
};

export default Buffer;
