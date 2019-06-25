import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Edit from "../pages/New";

configure({ adapter: new Adapter() });

describe("Testing Edit Component", () => {
  it("should render properly.", () => {
    const wrapper = shallow(<Edit />);

    expect(wrapper).toMatchSnapshot();
  });
});
