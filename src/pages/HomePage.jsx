import { ViewProject } from '../components'
import { buildings } from "../utils/server";
import { useTranslation } from 'react-i18next';
const HomePage = () => {
  const { t } = useTranslation();
  window.scrollTo({ top: 0 })
  
  return (
    <div className='md:mt-0 flex flex-col bg-white'>
      <div className='relative w-full h-screen md:min-h-[1080px] z-10'>
        <div className="absolute w-full md:h-full">
          <ViewProject buildings={buildings} />
        </div>
      </div>
    </div>
  )
}

export default HomePage 