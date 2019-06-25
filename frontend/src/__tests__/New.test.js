import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import New from "../pages/New";

configure({ adapter: new Adapter() });

describe("Testing New Component", () => {
  it("should render properly.", () => {
    const wrapper = shallow(<New />);

    expect(wrapper).toMatchSnapshot();
  });
});
