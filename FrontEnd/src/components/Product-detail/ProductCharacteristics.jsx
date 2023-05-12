import React from 'react'
import kitchen from '../../resources/characteristics/kitchen.svg'
import  '../styles/product-detail/product-characteristics.css'


 const ProductCharacteristics = ({characteristics}) => {
   return (
     <div className="content-characterstics">
       <h1>¿Qué ofrece este lugar?</h1>
       <ul className="characteristics-list">
         {characteristics.map((charact, i) => (
           <li key={`charact-${charact.idFeature}`} className="characteristic" >
             <img src={kitchen} alt="" />
             <p>{charact.title}</p>
           </li>
         ))}
       </ul>
     </div>
   );
 };


export default ProductCharacteristics;