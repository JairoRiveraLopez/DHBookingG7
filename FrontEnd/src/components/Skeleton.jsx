import React from "react";
import ContentLoader from "react-content-loader";
import PropTypes from 'prop-types'

/**
  Este componente sirve para crear el skeleton de cada card 
 */

 const SkeletonCategory = (props) => {
  let view = "0 0 310 246"
  return (
    <ContentLoader
      className="skeleton-categories"
      // width={310}
      // height={246}
      viewBox={view}
      backgroundColor="#f0f0f0"
      foregroundColor="#e6e6e6"
      {...props}
    >
      <rect x="0" y="0" rx="10" ry="10" width="310" height="246" />
    </ContentLoader>
  );
}

 const SkeletonRecomended = (props) => (
   <ContentLoader
     className="skeleton-recomended"
     speed={2}
     // viewBox="0 0 350 500"
     backgroundColor="#f3f3f3"
     foregroundColor="#ecebeb"
     {...props}
   >
     <rect x="0" y="0" rx="8" ry="8" className="skeleton-recomended" />
   </ContentLoader>
 );

  export const SkeletonCalendar = (props) => (
    <ContentLoader
      className="skeleton-calendar"
      speed={2}
      //  viewBox="0 0 350 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <rect
        x="0"
        y="0"
        rx="8"
        ry="8"
        width="310"
        height="246"
        className="skeleton-calendar"
      />
    </ContentLoader>
  );
/**
/**
  Este componente sirve para crear el numero de skleleton segun el numero de pokemones 
 */
export const SkeletonC = ({numCategory= 4})=>{
   
   const list = []

  for (let i = 0; i < numCategory; i++) {
    list.push(<SkeletonCategory key={i} />);
  }
  return(
   <>
    {list}
   </>
  )
}
export const SkeletonR = ({ numRecomended = 4 }) => {
  const list = [];

  for (let i = 0; i < numRecomended; i++) {
    list.push(<SkeletonRecomended key={i} />);
  }
  return <>{list}</>;
};

// export const SkeletonCa = ({ numRecomended = 1 }) => {
//   const list = [];

//   for (let i = 0; i < numRecomended; i++) {
//     list.push(<SkeletonRecomended key={i} />);
//   }
//   return <>{list}</>;
// };




// Skeleton.propTypes = {
//   numCategory: PropTypes.number.isRequired,
// };