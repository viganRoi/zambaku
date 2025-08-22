import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getWishlistModalData,
  removeFromWishlist,
} from "../../features/wishList/WishlistSlice";
import ApartmentWishlistCard from "../cards/ApartmentWishlistCard";
import { TfiClose } from "react-icons/tfi";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishData = useSelector(getWishlistModalData);

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
  };

  return (
    <div className="w-full min-h-[100vh] bg-brand flex flex-col justify-start items-center text-white pt-8 pb-8 md:pb-24">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-20 right-20 bg-transparent transition-all duration-.3s  hover:text-bck w-[35px] md:w-[50px] h-[35px] md:h-[50px] radius-50 rounded-[50px] flex items-center justify-center mb-2 border border-white"
      >
        <TfiClose className="fill-white" />
      </button>
      <div className="w-11/12 md:w-5/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
        {wishData.map((el) => {
          return (
            <ApartmentWishlistCard
              key={el.id}
              id={el.id}
              object={el.apartmentNumber}
              category={el.category}
              image={el.name}
              title={el.name}
              sqft={el.netoSquare}
              bedroom={el.rooms}
              navigateTo={() => navigate(`/apartments/${el.id}`)}
              onRemove={handleRemove}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Wishlist;
