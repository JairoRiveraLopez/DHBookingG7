import React from "react";
import useFetch from '../../hooks/useFetch';
import { useState, useContext } from "react";
import Plus from "../../resources/atomo plus.svg"
import Delete from "../../resources/atomo close.svg"
import axios from "axios";
import baseURL from '../../hooks/axiosBase'
import AuthContext from "../../context/AuthContext";
import { useEffect } from "react";

export const AddPolicies = ({ normPolicies, setNormPolicies, securityPolicies, setSecurityPolicies, cancellationPolicies, setCancellationPolicies, handleCancellationPolicie , handleSecurityPolicie, handleNormPolicie, }) => {
    const { userAuth } = useContext(AuthContext);
    const token = userAuth.token
    const [getnormPolicies, setGetNormPolicies] = useState([]);
    const [isLoadingNormPolicies, setIsLoadingNormPolicies] = useState(true)
    const [getCancellationPolicies, setGetCancellationPolicies] = useState([]);
    const [isLoadingCancellationPolicies, setIsLoadingCancellationPolicies] = useState(true)
    const [getSecurityPolicies, setGetSecurityPolicies] = useState([]);
    const [isLoadingSecurityPolicies, setIsLoadingSecurityPolicies] = useState(true)

    useEffect(() => {
        if (setIsLoadingNormPolicies) {
            let urlGetnormPolicies = baseURL + "normPolicies";
            axios.get(urlGetnormPolicies, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => {
                setGetNormPolicies(res.data);
                setIsLoadingNormPolicies(false)
            })
        }
    }, [isLoadingNormPolicies]);

    useEffect(() => {
        if (isLoadingCancellationPolicies) {
            let urlGetCancellationPolicies = baseURL + "cancellationPolicies";
            axios.get(urlGetCancellationPolicies, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => {
                setGetCancellationPolicies(res.data);
                setIsLoadingCancellationPolicies(false)
            })
        }
    }, [isLoadingCancellationPolicies]);

    useEffect(() => {
        if (isLoadingSecurityPolicies) {
            let urlGetSecurityPolicies = baseURL + "securityPolicies";
            axios.get(urlGetSecurityPolicies, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }).then(res => {
                setGetSecurityPolicies(res.data);
                setIsLoadingSecurityPolicies(false)
            })
        }
    }, [isLoadingSecurityPolicies]);

    const [policieNorm, setPolicieNorm] = useState();
    const [idpolicieNorm, setIDPolicieNorm] = useState([]);
    const [policieSecurity, setPolicieSecurity] = useState();
    const [idpolicieSecurity, setIDPolicieSecurity] = useState([]);
    const [policieCancellation, setPolicieCancellation] = useState();
    const [idpolicieCancellation, setIDPolicieCancellation] = useState([]);

    const handlePolicieNorm = (e) => {
        e.preventDefault()
        setNormPolicies([...normPolicies, JSON.parse(policieNorm)])
        const idagregado = {
            idNormPolity: JSON.parse(policieNorm).idNormPolity
        }
        setIDPolicieNorm([...idpolicieNorm, idagregado])
        handleNormPolicie([...idpolicieNorm, idagregado])
        document.getElementById('normPolicie').selectedIndex = 0;
    };

    const handleSelectChangePolicieNorm = (e) => {
        setPolicieNorm(e.target.value);
    }

    const deletePolicieNorm = (e, idNormPolicie) => {
        e.preventDefault()
        const newNormPolicies = normPolicies.filter((policie) => policie.idNormPolity !== idNormPolicie)
        setNormPolicies(newNormPolicies)
        const newIDNormPolicies = idpolicieNorm.filter((policie) => policie.idNormPolity !== idNormPolicie)
        setIDPolicieNorm(newIDNormPolicies)
        handleNormPolicie(newIDNormPolicies)
    }

    console.log(normPolicies)

    const handlePolicieSecurity = (e) => {
        e.preventDefault()
        setSecurityPolicies([...securityPolicies, JSON.parse(policieSecurity)])
        const idagregado = {
            idSecurityPolity: JSON.parse(policieSecurity).idSecurityPolity
        }
        setIDPolicieSecurity([...idpolicieSecurity, idagregado])
        handleSecurityPolicie([...idpolicieSecurity, idagregado])
        document.getElementById('securityPolicie').selectedIndex = 0;
    };

    const handleSelectChangePolicieSecurity = (e) => {
        setPolicieSecurity(e.target.value);
    }
    
    const deletePolicieSecurity = (e, idSecurityPolicie) => {
        e.preventDefault()
        const newSecurityPolicies = securityPolicies.filter((policie) => policie.idSecurityPolity !== idSecurityPolicie)
        setSecurityPolicies(newSecurityPolicies)
        const newIDSecurityPolicies = idpolicieSecurity.filter((policie) => policie.idSecurityPolity !== idSecurityPolicie)
        setIDPolicieSecurity(newIDSecurityPolicies)
        handleSecurityPolicie(newIDSecurityPolicies)
        
    }

    const handlePolicieCancellation = (e) => {
        e.preventDefault()
        setCancellationPolicies([...cancellationPolicies, JSON.parse(policieCancellation)])
        
        const idagregado = {
            idCancellationPolity: JSON.parse(policieCancellation).idCancellationPolity
        }
        setIDPolicieCancellation([...idpolicieCancellation, idagregado])
        handleCancellationPolicie([...idpolicieCancellation, idagregado])
        document.getElementById('cancellationPolicie').selectedIndex = 0;
    };

    const handleSelectChangePolicieCancellation = (e) => {
        setPolicieCancellation(e.target.value);
    }

    const deletePolicieCancellation = (e, idCancellationPolicie) => {
        e.preventDefault()
        const newCancellationPolicies = cancellationPolicies.filter((policie) => policie.idCancellationPolity !== idCancellationPolicie)
        setCancellationPolicies(newCancellationPolicies)
        const newIDCancellationPolicies = idpolicieCancellation.filter((policie) => policie.idCancellationPolity !== idCancellationPolicie)
        setIDPolicieSecurity(newIDCancellationPolicies)
        handleCancellationPolicie(newIDCancellationPolicies)
    }

    return (
        <div className="policies">
            <div className="content-form-create-policies">
                <h3>Normas de la casa</h3>
                <label htmlFor="Norm">Descripción</label>
                <div className="div-policies">
                    <select className="policies" id="normPolicie" name="normPolicie" onChange={(event) => handleSelectChangePolicieNorm(event)}>
                        <option selected hidden>Seleccione una opcion</option>
                        {!isLoadingNormPolicies &&
                            getnormPolicies.map((policie, index) => (
                                <option
                                    value={JSON.stringify(policie)}
                                    key={policie.idNormPolicie}
                                >
                                    {policie.description}
                                </option>
                            ))
                        }
                    </select>
                    <div>
                        <button className="plus-btn-policies" onClick={(event) => handlePolicieNorm(event)} >
                            <img className="" src={Plus} alt="plus" />
                        </button>
                    </div>
                </div>
                {
                    !isLoadingNormPolicies &&
                    normPolicies.map((policie, index) => (
                        <div className="div-policies">
                            <div className="form-control-create">
                                <label htmlFor="normPolicies">Descripción</label>
                                <select disabled className="policies" id="normPolicies" name="normPolicies">
                                    <option>{policie.description}</option>
                                </select>
                            </div>
                            <div>
                                <button className="plus-btn-policies" onClick={(event) => deletePolicieNorm(event, policie.idNormPolity)}>
                                    <img className="" src={Delete} alt="delete" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="content-form-create-policies">
                <h3>Salud y seguridad</h3>
                <label htmlFor="Norm">Descripción</label>
                <div className="div-policies">
                    <select className="policies" id="securityPolicie" name="securityPolicie" onChange={(event) => handleSelectChangePolicieSecurity(event)}>
                        <option selected hidden>Seleccione una opcion</option>
                        {!isLoadingSecurityPolicies &&
                            getSecurityPolicies.map((policie, index) => (
                                <option
                                    value={JSON.stringify(policie)}
                                    key={policie.idSecurityPolicie}
                                >
                                    {policie.description}
                                </option>
                            ))
                        }
                    </select>
                    <div>
                        <button className="plus-btn-policies" onClick={(event) => handlePolicieSecurity(event)}>
                            <img className="" src={Plus} alt="plus" />
                        </button>
                    </div>
                </div>
                {
                    !isLoadingSecurityPolicies &&
                    securityPolicies.map((policie, index) => (
                        <div className="div-policies">
                            <div className="form-control-create">
                                <label htmlFor="normPolicies">Descripción</label>
                                <select disabled className="policies" id="normPolicies" name="normPolicies">
                                    <option>{policie.description}</option>
                                </select>
                            </div>
                            <div>
                                <button className="plus-btn-policies" onClick={(event) => deletePolicieSecurity(event, policie.idSecurityPolity)}>
                                    <img className="" src={Delete} alt="delete" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="content-form-create-policies">
                <h3>Política de Cancelación</h3>
                <label htmlFor="Norm">Descripción</label>
                <div className="div-policies">
                    <select className="policies" id="cancellationPolicie" name="cancellationPolicie" onChange={(event) => handleSelectChangePolicieCancellation(event)}>
                        <option selected hidden>Seleccione una opcion</option>
                        {!isLoadingCancellationPolicies &&
                            getCancellationPolicies.map((policie, index) => (
                                <option
                                    value={JSON.stringify(policie)}
                                    key={policie.idCancellationPolicie}
                                >
                                    {policie.description}
                                </option>
                            ))
                        }
                    </select>
                    <div>
                        <button className="plus-btn-policies" onClick={(event) => handlePolicieCancellation(event)}>
                            <img className="" src={Plus} alt="plus" />
                        </button>
                    </div>
                </div>
                {
                    !isLoadingCancellationPolicies &&
                    cancellationPolicies.map((policie, index) => (
                        <div className="div-policies">
                            <div className="form-control-create">
                                <label htmlFor="normPolicies">Descripción</label>
                                <select disabled className="policies" id="normPolicies" name="normPolicies">
                                    <option>{policie.description}</option>
                                </select>
                            </div>
                            <div>
                                <button className="plus-btn-policies" onClick={(event) => deletePolicieCancellation(event, policie.idCancellationPolity)}>
                                    <img className="" src={Delete} alt="delete" />
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AddPolicies