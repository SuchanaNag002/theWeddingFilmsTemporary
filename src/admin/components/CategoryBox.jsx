const CategoryBox = (props) => {
  const handleClick = () => {
    props.setter(props.index);
  };
  //console.log(props.name);
  //console.log(props.currentCategoryIndex);

  return (
    <button
      onClick={handleClick}
      className={`${
        props.currentCategoryIndex === props.index
          ? " bg-black text-white "
          : " bg-white text-black "
      } 
             outline-black outline-2 outline  hover:scale-105 active:scale-75 shadow-around 
            px-4 py-2 rounded-full transition-transform duration-400`}
    >
      {props.name}
    </button>
  );
};

export default CategoryBox;
