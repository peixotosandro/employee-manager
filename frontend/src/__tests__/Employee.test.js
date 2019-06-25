import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Employees from "../pages/Employees";

configure({ adapter: new Adapter() });

describe("Testing Employees Component", () => {
  it("should render properly.", () => {
    const wrapper = shallow(<Employees />);

    expect(wrapper).toMatchSnapshot();
  });
});
