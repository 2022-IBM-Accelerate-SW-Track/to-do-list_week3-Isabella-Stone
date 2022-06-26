import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/History Test/i);
  const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(check).toBeInTheDocument();
  expect(checkDate).toBeInTheDocument();
 });

test('test that App component doesn\'t render dupicate Task', () => {
  //add intial task
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  
  //try to add duplicate
  const inputTask2 = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate2 = screen.getByPlaceholderText("mm/dd/yyyy");
  const element2 = screen.getByRole('button', {name: /Add/i});
  const dueDate2 = "05/20/2023";
  fireEvent.change(inputTask2, { target: { value: "History Test"}});
  fireEvent.change(inputDate2, { target: { value: dueDate}});
  fireEvent.click(element2);
  const check = screen.getByText(/History Test/i);
  expect(check).toBeInTheDocument();
 });

test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "";
  fireEvent.change(inputTask, { target: { value: "History Test"}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  //const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
  expect(check).toBeInTheDocument();
  //expect(checkDate).not.toBeInTheDocument();
 });

test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
  const element = screen.getByRole('button', {name: /Add/i});
  const dueDate = "05/30/2023";
  fireEvent.change(inputTask, { target: { value: ""}});
  fireEvent.change(inputDate, { target: { value: dueDate}});
  fireEvent.click(element);
  const check = screen.getByText(/You have no todo's left/i);
  expect(check).toBeInTheDocument();
 });

// test('test that App component renders different colors for past due events', () => {
//   render(<App />);
//   const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
//   const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
//   const element = screen.getByRole('button', {name: /Add/i});
//   const dueDate = "05/30/2020";
//   fireEvent.change(inputTask, { target: { value: "History Test"}});
//   fireEvent.change(inputDate, { target: { value: dueDate}});
//   fireEvent.click(element);
//   const check = screen.getByText(/History Test/i);
//   const checkDate = screen.getByText(new RegExp(new Date(dueDate).toLocaleDateString(), "i"));
//   const historyCheck = screen.getByTestId(/History Test/i).style.background;
//   expect(check).toBeInTheDocument();
//   expect(checkDate).toBeInTheDocument();
//   expect(historyCheck).toHaveTextContent('History Test');
//  });

// test('test that App component can be deleted thru checkbox', () => {
//   //add intial task
//   render(<App />);
//   const inputTask = screen.getByRole('textbox', {name: /Add New Item/i});
//   const inputDate = screen.getByPlaceholderText("mm/dd/yyyy");
//   const element = screen.getByRole('button', {name: /Add/i});
//   const dueDate = "05/30/2023";
//   fireEvent.change(inputTask, { target: { value: "History Test"}});
//   fireEvent.change(inputDate, { target: { value: dueDate}});
//   fireEvent.click(element);

//   //try to delete
//   const inputTask2 = screen.getByRole('checkbox', { name: 'cbox' });
//   fireEvent.change(inputTask, { target: { value: "History Test"}});


//  });

