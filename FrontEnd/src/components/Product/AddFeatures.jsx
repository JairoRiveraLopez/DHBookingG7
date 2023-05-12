import React from "react";
import useFetch from '../../hooks/useFetch';
import { useState } from "react";
import Plus from "../../resources/atomo plus.svg"
import Delete from "../../resources/atomo close.svg"

export const AddFeatures = ({features, setFeatures, handleFeature}) => {

    const { response: getfeatures, isLoading: isLoadingFeatures } = useFetch({
        method: "get",
        url: "/features",
    });

    const [feature, setFeature] = useState();
    
    const handleFeatures = (e) => {
        e.preventDefault()
        setFeatures([...features, JSON.parse(feature)])
        handleFeature([...features, JSON.parse(feature)])
        document.getElementById('feature').selectedIndex = 0;
    };

    const handleSelectChange = (e) => {
        setFeature(e.target.value);
    }

    const deleteFeatures = (e, idfeature) => {
        e.preventDefault()
        console.log(idfeature)
        const newFeatures = features.filter((feature) => feature.idFeature !== idfeature )
        console.log(newFeatures)
        setFeatures(newFeatures)
        handleFeature(newFeatures)
    }

    return (
        <>
            {
                !isLoadingFeatures &&
                features.map((features, index) => (
                    <div className="features">
                        <div className="form-control-create">
                            <label htmlFor="nameFeature">Nombre</label>
                            <select disabled className="feature" id="nameFeature" name="nameFeature" onChange={(event) => handleSelectChange(event, index)}>
                                <option>{features.title}</option>
                            </select>
                        </div>
                        <div>
                            <button className="plus-btn" onClick={(event) => deleteFeatures(event, features.idFeature)}>
                                <img className="" src={Delete} alt="plus" />
                            </button>
                        </div>
                    </div>
                ))
            }
            <div className="features">
                <div className="form-control-create">
                    <label htmlFor="feature">Nombre</label>
                    <select className="feature" id="feature" name="feature" onChange={(event) => handleSelectChange(event)}>
                        <option selected hidden>Seleccione una opcion</option>
                        {!isLoadingFeatures &&
                            getfeatures.map((feature, index) => (
                                <option
                                    hidden={features.find(element => element.idFeature === feature.idFeature)}
                                    value={JSON.stringify(feature)}
                                    key={feature.idFeature}
                                >
                                    {feature.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <button className="plus-btn" onClick={(e) => handleFeatures(e)}>
                        <img className="" src={Plus} alt="plus" />
                    </button>
                </div>
            </div>

        </>
    )
}

export default AddFeatures