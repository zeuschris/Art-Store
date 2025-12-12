import { RingLoader } from 'react-spinners';

const LoaderComponent = () => {
  return (
    <div className='d-flex justify-content-center my-5'>
        <RingLoader color="#EC6EAD" size={150} speedMultiplier={2} />
    </div>
  )
}

export default LoaderComponent