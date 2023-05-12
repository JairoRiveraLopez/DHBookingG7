import React from "react";
import useFetch from '../../hooks/useFetch';
import '../styles/product/product-create.css'
import { useForm } from "../../hooks/useForm";
import AddFeatures from "./AddFeatures";
import { useState, useContext } from "react";
import AddPolicies from "./AddPolicies";
import AddImages from "./AddImages";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import baseURL from '../../hooks/axiosBase'
import AuthContext from "../../context/AuthContext";
import ProductHeader from "./ProductHeader";



export const ProductCreate = () => {

    const { response: cities, isLoading: isLoadingCities } = useFetch({
        method: "get",
        url: "/cities",
    });

    const { response: categories, isLoading: isLoadingCategories } = useFetch({
        method: "get",
        url: "/categories",
    });

    const [features, setFeatures] = useState([]);
    const [normPolicies, setNormPolicies] = useState([]);
    const [securityPolicies, setSecurityPolicies] = useState([]);
    const [cancellationPolicies, setCancellationPolicies] = useState([]);
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const { userAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formValues, handleInputChange, handleInputChangeAddress, handleInputChangeCategory,
        handleInputChangeCity, handleFeature, handleCancellationPolicie, handleSecurityPolicie,
        handleNormPolicie, handleImage, reset] = useForm({
            titleDescription: "",
            quality: 8,
            distance: "40",
            feature: features,

        });

    console.log(formValues)
    const createProduct = (e) => {
        e.preventDefault()
        try {
            let urlPost = baseURL + "products";
            axios.
                post(urlPost, formValues, {
                    headers: {
                        Authorization: `Bearer ${userAuth.token}`,
                        UserEmail: userAuth.email
                    },
                }).then(response => {
                    navigate(`/successful-product`);
                }).catch((e) => setError(e))
        } catch (error) {
            console.log(error);
        }
    }

    console.log(formValues)



    return (
        <div className="header">
            <ProductHeader></ProductHeader>
            <div className="create">

                <form className="content-form-create">
                    <h1>Crear propiedad</h1>
                    <div className="form-control-create">
                        <label htmlFor="name">Nombre de la propiedad</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Hotel Hermirage"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control-create">
                        <label htmlFor="category">Categorias</label>
                        <select id="idCategory" name="idCategory" onChange={handleInputChangeCategory}>
                            <option disabled hidden >Categoria</option>
                            {!isLoadingCategories &&
                                categories.map((category, index) => (
                                    <option
                                        value={category.idCategory}
                                        key={category.idCategory}
                                    >
                                        {category.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="form-control-create">
                        <label htmlFor="address">Dirección</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Av. Colón 1643"
                            onChange={handleInputChangeAddress}
                        />
                    </div>
                    <div className="form-control-create">
                        <label htmlFor="ciudad">Ciudad</label>
                        <select id="idCity" name="idCity" onChange={handleInputChangeCity}>
                            <option disabled hidden >Ciudad</option>
                            {!isLoadingCities &&
                                cities.map((city, index) => (
                                    <option
                                        value={city.idCity}
                                        key={city.idCity}
                                    // defaultValue={city.idCity === city}
                                    >
                                        {city.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="form-control-create">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control-create">
                        <h2>Agregar atributos</h2>
                        <AddFeatures
                            features={features}
                            setFeatures={setFeatures}
                            handleFeature={handleFeature} />
                    </div>
                    <div className="form-control-create">
                        <h2 className="h2">Políticas del producto</h2>
                        <AddPolicies
                            normPolicies={normPolicies}
                            setNormPolicies={setNormPolicies}
                            securityPolicies={securityPolicies}
                            setSecurityPolicies={setSecurityPolicies}
                            cancellationPolicies={cancellationPolicies}
                            setCancellationPolicies={setCancellationPolicies}
                            handleCancellationPolicie={handleCancellationPolicie}
                            handleSecurityPolicie={handleSecurityPolicie}
                            handleNormPolicie={handleNormPolicie}
                        />
                    </div>
                    <div className="form-control-create">
                        <h2>Imagenes</h2>
                        <AddImages
                            images={images}
                            setImages={setImages}
                            handleImage={handleImage}
                        />
                    </div>
                    <div>
                        <button className="button" onClick={(event) => createProduct(event)}>Crear Producto</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default ProductCreate;