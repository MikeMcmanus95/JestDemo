import React from 'react';
import { render, prettyDOM, fireEvent } from '@testing-library/react';
import { add } from '../utils/calculations';
import Calculator from '../Calculator';

// Describe defines our test
describe('The calculator component', () => {
  // we set another describe to seperate our business and visual logic
  describe('Business logic', () => {
    //
    it('the add function adds two numbers together', () => {
      expect(add(1, 2)).toBe(3);
      expect(add(-1, 2)).toBe(1);
    });
  });

  describe('Visual logic', () => {
    it('renders', () => {
      // The render method creates a virtual dom, as well as other methods that we can play with. One of them is debug, which is a function that when invoked will log the virtual DOM to the console.
      const { container, debug } = render(<Calculator />);
      // console.log(debug());

      // We can also use prettyDOM to leverage our container, which has real dom methods that we can leverage.
      // console.log(prettyDOM(container.firstChild));

      // expect()
    });
    it('has a header with the text "Calculator"', () => {
      const { getByText } = render(<Calculator />);
      expect(
        getByText((content, element) => {
          return (
            element.tagName.toLowerCase() === 'div' && content === 'Calculator'
          );
        })
      ).toBeTruthy();
    });
  });

  it('has two forms to input the numbers to add', () => {
    const { getAllByRole } = render(<Calculator />);
    const forms = getAllByRole('textbox');
    expect(forms).toHaveLength(2);
  });

  it('which have ids of "num-one" and "num-two" and are set to 0 as default values', () => {
    const { getByDisplayValue } = render(<Calculator />);
    expect(
      getByDisplayValue((value, element) => {
        return element.id === 'numOne' && Number(value) === 0;
      })
    ).toBeTruthy();

    expect(
      getByDisplayValue((value, element) => {
        return element.id === 'numTwo' && Number(value) === 0;
      })
    ).toBeTruthy();
  });

  it('renders a calculate button represented by "="', () => {
    const { getByText } = render(<Calculator />);
    expect(
      getByText((content, element) => {
        return element.id === 'calcButton' && content === '=';
      })
    ).toBeTruthy();
  });

  it('can add two numbers together by filling in the number inputs and hitting the submit button', () => {
    const { getAllByRole, getByText } = render(<Calculator />);
    const expectations = {
      numOne: 1,
      numTwo: 2,
    };
    // We get both the inputs using getByRole, and pass in textbox.
    const inputs = getAllByRole('textbox');
    inputs.forEach(input => {
      fireEvent.change(input, { target: { value: expectations[input.id] } });
    });
    // getByText is returning a DOM element, and fireEvent is simulating a click
    fireEvent.click(getByText('='));

    // Now we can write our assertion, we just simulated a click, lets see if this thing added correctly!

    expect(
      getByText((content, element) => {
        return element.className === 'result' && Number(content) === 3;
      })
    ).toBeTruthy();
  });
});
