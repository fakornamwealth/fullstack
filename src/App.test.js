//import { render, screen, cleanup } from "@testing-library/react";
// import dependencies
import renderer from "react-test-renderer";
//import { BrowserRouter } from "react-router-dom";
//import App from "./components/products/Products";
import { generalRequest, userRequest } from "./httpService.js";
import Products from "./components/products/Products";

// snapshot test
test("Product component snapshot test", function () {
  let tree = renderer.create(<Products />).toJSON(); // get json object representing the app
  console.log(tree);
  expect(tree).toMatchSnapshot(); // compare to snapshot
});

// unit test
test("test general request function", async function () {
  const response = await generalRequest.get("/product");

  //console.log(response);

  expect(response.status).toEqual(200); // compare result status to be 200
});

test("test general user request function", async function () {
  const response = await userRequest.get("/product");

  //console.log(response);

  expect(response.status).toEqual(200); // compare result status to be 200
});
