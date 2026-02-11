import React from "react";


function CategoriesCard(props) {
  console.log(props)
 

  return (
    <div className="transform transition duration-300 ease-in-out hover:scale-105 bg-white  h-36  shadow-sm hover: p-2 flex flex-col items-center justify-between">
      {/* IMAGE */}
      <img
        src={props.categorie?.store.logo}
        alt="Dog & Cat Electric Clippers"
        className="w-20 h-20 object-contain"
      />

      {/* NAME */}
      <p className="text-[14px]   text-center leading-tight line-clamp-2">
        {props.categorie?.category}
      </p>
    </div>
  );
}

export default CategoriesCard;
