import { configure } from "enzyme";

import Adapter from "enzyme-adapter-react-16";

module.exports = () => {
  configure({ adapter: new Adapter() });
};
