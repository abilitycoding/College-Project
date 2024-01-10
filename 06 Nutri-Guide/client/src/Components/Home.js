import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const [Search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);
  const [error, setError] = useState(null);
  console.log(Search);

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/food/${Search}`
      );
      // Extracting JSONP data
      const jsonData = JSON.parse(
        response.data.substring(
          response.data.indexOf("{"),
          response.data.lastIndexOf("}") + 1
        )
      );

      setData(jsonData);

      // Access the count property from the response data
      const resultCount = jsonData.count;
      console.log(resultCount);

      setError(null); // Reset error state on successful request
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status.
        setError(`Server responded with ${error.response.status} status.`);
      } else if (error.request) {
        // The request was made, but no response was received.
        setError("No response received from the server.");
      } else {
        // Something happened in setting up the request that triggered an Error.
        setError(`Error setting up the request: ${error.message}`);
      }
      setData(null); // Set weather to null on error
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (Search.trim() !== "") {
      getWeather();
    }
    // Optionally, you can provide user feedback for an empty search
  };

  const handleRecipeClick = (index) => {
    setSelectedRecipeIndex(index);
  };

  return (
    <div className="home_box w-100">
      <div role="banner">
        <h1 className="text-center p3-5 text-white">Nutrition Guide</h1>
        <p className="text-center fw-bold">
          Want to cook your favorite meal but not sure how healthy it is?
        </p>
        <p className="text-center fw-bold">
          NutriGuide is your friend. Search over 2 million food recipes across
          the globe along with the nutrition information.
        </p>
      </div>

      <main>
        <form className="js-search-form">
          <h2 className="text-center text-info">Search a food item here</h2>
          <div className="wrapper-input ">
            <label htmlFor="query"></label>
            <input
              type="text"
              placeholder="Search for food..."
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              className="js-query"
            />
          </div>
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
          <p className="accuracy-note">
            *For accurate results, try to be as specific as possible
          </p>
        </form>
        <Container>
          <Row>
            <Col lg={3}>
              {data && data.count ? (
                <>
                  <section className="search-result p-0 rounded-3">
                    <ul className="text-center fs-5 query-results p-0 m-0">
                      <li className="item-title fw-bold">Choose your Dish</li>
                    </ul>
                    <ul className="query-results p-0">
                      {data.hits.map((result, index) => (
                        <li key={index}>
                          <div
                            id={`item-${index}`}
                            onClick={() => handleRecipeClick(index)}
                          >
                            {result.recipe.label}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </section>
                </>
              ) : (
                <p className="show-recipe-p">Search to get recipe...</p>
              )}
            </Col>
            <Col>
              <section className="show-recipe rounded-3">
                {selectedRecipeIndex !== null &&
                data &&
                data.hits &&
                data.hits.length > 0 ? (
                  <>
                    <h3 className="item-title">
                      {data.hits[selectedRecipeIndex].recipe.label}
                    </h3>
                    <div className="image-area">
                      <img
                        src={data.hits[selectedRecipeIndex].recipe.image}
                        alt={data.hits[selectedRecipeIndex].recipe.label}
                        width="150px"
                        className="rounded-circle"
                      />
                      <div className="recipe-button-area">
                        <p className="full-recipe-text">
                          Read full recipe here:
                        </p>
                        <a
                          href={data.hits[selectedRecipeIndex].recipe.url}
                          target="_blank"
                          className="instructions"
                        >
                          Instructions
                        </a>
                      </div>
                    </div>
                    <div className="result-wrapper">
                      <Col xs={12} lg={6} className="ingredients m-0">
                        <h4>Ingredients</h4>
                        <hr />
                        <ul className="ingredients-list">
                          {data.hits[
                            selectedRecipeIndex
                          ].recipe.ingredientLines.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                          ))}
                        </ul>
                      </Col>
                      <Col xs={12} lg={6} className="nutrition m-0">
                        <h4>Nutrition</h4>
                        <hr />
                        {/* Display nutrition information if available in your data */}
                        {/* Example: */}
                        {data.hits[selectedRecipeIndex].recipe.totalNutrients &&
                          Object.entries(
                            data.hits[selectedRecipeIndex].recipe.totalNutrients
                          ).map(([nutrient, info]) => (
                            <li key={nutrient}>
                              {info.label}: {info.quantity} {info.unit}
                            </li>
                          ))}
                      </Col>
                    </div>
                  </>
                ) : (
                  <p className=" text-center">
                    No recipe details available search for dish
                  </p>
                )}
              </section>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Home;
