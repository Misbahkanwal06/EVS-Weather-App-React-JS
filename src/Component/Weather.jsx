import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import { IconName } from "react-icons/fa";

function Weather() {
    const [city, setCity] = useState("");
    // console.log(city);
    const [apiDataCountry, setapiDataCountry] = useState({});
    const [apiData, setApiData] = useState({});
    const [isFahrenheit, setisFahrenheit] = useState(false);
    const [isCelsius, setisCelsius] = useState(false);
    const [loading, setLoading] = useState(false);

    const fahrenheit = () => {
        setisFahrenheit(apiData && apiData.temp_f);
        setisCelsius(false);
        setisFahrenheit(true);
    }
    const celcius = () => {
        setisCelsius(apiData && apiData.temp_c);
        setisFahrenheit(false);
        setisCelsius(true);
    }

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .get(`http://api.weatherapi.com/v1/current.json?q=${city}`, {
                headers: { key: "73e45b4bac7e47b880b92804241101" },
            })
            .then((response) => {
                console.log(response.data);
                response.data && setApiData(response.data.current);
                response.data && setapiDataCountry(response.data);
                setisCelsius(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            }).finally(() => {
                setLoading(false);
            });
    };

    //  useEffect(() => {
    //    const d = axios
    //      .get(http://api.weatherapi.com/v1/current.json?q={city}, {
    //        headers: { key: "73e45b4bac7e47b880b92804241101" },
    //      })
    //      .then((response) => {
    //        console.log(response.data);
    //        response.data && setApiData(response.data.current);
    //        response.data && setapiDataCountry(response.data);
    //      })
    //      .catch((error) => {
    //        console.error("Error fetching data:", error);
    //      });
    //  }, [city]);


    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://api.weatherapi.com/v1/current.json?q="karachi"`, {
                headers: { key: "73e45b4bac7e47b880b92804241101" },
            })
            .then((response) => {
                console.log(response.data);
                response.data && setApiData(response.data.current);
                response.data && setapiDataCountry(response.data);
                setisCelsius(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    console.log(apiData);
    console.log(apiDataCountry);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center "
                style={{
                    height: "100vh",
                }}>
                <div
                    className="card "
                    style={{
                        height: "420px",
                        width: "26rem",
                        backgroundColor: "rgb(47, 47, 97)",
                    }}
                >
                    <div className="mb-5  my-5 text-center container">
                        <div className="d-flex">
                            <input
                                type="text"
                                value={city}
                                className="form-control container  border-end-0 border rounded-pill"
                                // id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter your City or Country"
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <button
                                className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                                as="input"
                                type="submit"
                                onClick={submit}
                            >
                                search
                                {/* <i className="fa fa-search" /> */}
                                <i class="fa fa-search" aria-hidden="true"> </i>
                            </button>

                            {/* <Button
                                as="input"
                                type="submit"
                                value="Submit"
                                onClick={submit}
                                className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill"
                            /> */}
                        </div>

                        <div className=" my-4 d-flex">
                            {loading ? (
                                <div class="container text-white  text-center d-flex text-white justify-content-center align-items-center" >
                                    <div class="spinner-border  " role="status">
                                        <span class="visually-hidden ">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="my-3 d-flex">

                                    {/* ... ............... */}
                                    <div
                                        className=" my-2 "
                                        style={{ height: "120px", width: "12rem" }}
                                    >

                                        <Card.Img
                                            className=" my-2"
                                            style={{ height: "100px", width: "10rem" }}
                                            // variant="top"
                                            src={apiData && apiData.condition && apiData.condition.icon}
                                        /> <br />

                                        <b className="text-light">
                                            {apiData && apiData.condition && apiData.condition.text}
                                        </b>

                                        <p className="text-light">
                                            {`H : ${apiDataCountry &&
                                                apiDataCountry.location &&
                                                apiDataCountry.location.lon
                                                }°   `}
                                            {` L : ${apiDataCountry &&
                                                apiDataCountry.location &&
                                                apiDataCountry.location.lat
                                                }° `}
                                        </p>

                                    </div>
                                    <div className="ms-3 my-2">
                                        <button
                                            type="button"
                                            class="btn btn-light"
                                            data-toggle="button"
                                            aria-pressed="false"
                                            autocomplete="off"
                                            onClick={fahrenheit}
                                        >
                                            °F
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-light"
                                            data-toggle="button"
                                            aria-pressed="false"
                                            autocomplete="off"
                                            onClick={celcius}
                                        >
                                            °C
                                        </button>

                                        <h1 className="my-3 text-light" style={{ fontSize: "3rem" }}>

                                            {apiData && `${isFahrenheit?`${apiData.temp_f}°F`: `${apiData.temp_c}°C`}`}
                                            
                                            {/* {apiData && `${isFahrenheit?`${apiData.temp_f}°F`: apiData.temp_c}`} */}
                                        </h1>

                                        {/* <h1
                                    className=" my-4 fs-10 ms-2  text-light"
                                    style={{ fontSize: "4rem" }}
                                >
                                    {`${apiData && apiData.temp_c}°C`}
                                </h1> */}

                                        <p className=" text-light">
                                            {`       ${
                                                // city &&
                                                apiDataCountry &&
                                                apiDataCountry.location &&
                                                apiDataCountry.location.name
                                                }-`}
                                            {
                                                apiDataCountry &&
                                                apiDataCountry.location &&
                                                apiDataCountry.location.country
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}


                            {/* <div
                                className=" my-4"
                                style={{ height: "120px", width: "12rem" }}
                            >
                                <Card.Img
                                    className=" my-2"
                                    style={{ height: "100px", width: "10rem" }}
                                    variant="top"
                                    src={apiData && apiData.condition && apiData.condition.icon}
                                />
                                <b className="text-light">
                                    {apiData && apiData.condition && apiData.condition.text}
                                </b>
                                <p className="text-light">
                                    {`H : ${apiDataCountry &&
                                        apiDataCountry.location &&
                                        apiDataCountry.location.lon
                                        }°   `}
                                    {` L : ${apiDataCountry &&
                                        apiDataCountry.location &&
                                        apiDataCountry.location.lat
                                        }° `}
                                </p>
                            </div> */

                            }

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Weather;