import {render} from "@testing-library/react"
import Greeting from "Greetings"
test("renders greeting message", () => {
    const {container} = render(<Greeting name = "Geetika"/>);
    expect(container).toMatchSnapshot();
});